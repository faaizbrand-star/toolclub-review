import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { ProofItem, PublicProofData } from '../types';
import { compareByDateDescending } from '../utils/dateSorter';

const PROOFS_COLLECTION = 'proofs';
const CACHE_KEY = 'toolclubpk_proofs_cache_v4';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache duration across page refreshes

interface CacheEnvelope {
  timestamp: number;
  data: ProofItem[];
}

// In-memory cache for 0ms instant rendering across component renders & navigations
let inMemoryProofsCache: ProofItem[] | null = null;
let inMemoryCacheTime: number = 0;

// Request deduplication: ensures multiple simultaneous calls reuse the same in-flight query
let inFlightProofsPromise: Promise<ProofItem[]> | null = null;

// Load persistent cache from localStorage
function loadLocalCacheEnvelope(): CacheEnvelope | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    // If envelope format { timestamp, data }
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.data)) {
      const clean = parsed.data.filter(
        (p: ProofItem) => !p.id?.startsWith('proof-sample-') && !p.id?.includes('sample')
      );
      return { timestamp: parsed.timestamp || 0, data: clean };
    }

    // If legacy array format
    if (Array.isArray(parsed) && parsed.length > 0) {
      const clean = parsed.filter(
        (p: ProofItem) => !p.id?.startsWith('proof-sample-') && !p.id?.includes('sample')
      );
      return { timestamp: 0, data: clean };
    }
  } catch {}
  return null;
}

function loadLocalCache(): ProofItem[] | null {
  const envelope = loadLocalCacheEnvelope();
  return envelope ? envelope.data : null;
}

/**
 * Checks if a valid non-expired cache exists in memory or local storage.
 * Prevents unnecessary Firestore READ operations on normal page refresh.
 */
export function isProofsCacheValid(): boolean {
  const now = Date.now();
  // 1. Check in-memory cache
  if (inMemoryProofsCache && inMemoryProofsCache.length > 0) {
    if (now - inMemoryCacheTime < CACHE_TTL_MS) {
      return true;
    }
  }

  // 2. Check persistent localStorage envelope
  const envelope = loadLocalCacheEnvelope();
  if (envelope && envelope.data && envelope.data.length > 0) {
    if (now - envelope.timestamp < CACHE_TTL_MS) {
      inMemoryProofsCache = envelope.data;
      inMemoryCacheTime = envelope.timestamp;
      return true;
    }
  }

  return false;
}

function updateCache(proofs: ProofItem[]) {
  const cleanProofs = proofs.filter(
    (p) => !p.id?.startsWith('proof-sample-') && !p.id?.includes('sample')
  );
  inMemoryProofsCache = cleanProofs;
  inMemoryCacheTime = Date.now();

  if (typeof window !== 'undefined') {
    try {
      const envelope: CacheEnvelope = {
        timestamp: inMemoryCacheTime,
        data: cleanProofs,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(envelope));
    } catch {}
  }
}

export function getCachedProofsInstant(): PublicProofData[] {
  const cached = inMemoryProofsCache || loadLocalCache();
  if (!cached || cached.length === 0) return [];

  const clean = cached.filter(
    (p) => !p.id?.startsWith('proof-sample-') && !p.id?.includes('sample')
  );
  const sorted = [...clean].sort(compareByDateDescending);
  return sorted
    .filter((p) => p.status === 'active')
    .map((p) => ({
      id: p.id,
      customerId: p.customerId,
      customerName: p.customerName,
      serviceName: p.serviceName,
      deliveryDate: p.deliveryDate,
      notes: p.notes,
      screenshots: p.screenshots || [],
      verifiedAt: p.verifiedAt || p.createdAt,
      verificationHash: p.verificationHash,
    }));
}

export async function getProofsFromFirestore(forceRefresh = false): Promise<ProofItem[]> {
  // 1. If not a forced refresh and cache is valid, reuse cached data with ZERO Firestore reads!
  if (!forceRefresh && isProofsCacheValid()) {
    const cached = inMemoryProofsCache || loadLocalCache();
    if (cached && cached.length > 0) {
      return [...cached].sort(compareByDateDescending);
    }
  }

  // 2. If a network request is already running, deduplicate and reuse that exact promise
  if (inFlightProofsPromise) {
    return inFlightProofsPromise;
  }

  inFlightProofsPromise = (async () => {
    try {
      const proofsCol = collection(db, PROOFS_COLLECTION);
      const snapshot = await getDocs(proofsCol);

      const proofs: ProofItem[] = [];
      const sampleDocIdsToDelete: string[] = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as ProofItem;
        const docId = data.id || docSnap.id;
        if (docId.startsWith('proof-sample-') || docId.includes('sample')) {
          sampleDocIdsToDelete.push(docSnap.id);
          return;
        }
        proofs.push({
          ...data,
          id: docId,
        });
      });

      // Delete any old sample documents from Firestore in the background
      if (sampleDocIdsToDelete.length > 0) {
        sampleDocIdsToDelete.forEach((id) => {
          deleteDoc(doc(db, PROOFS_COLLECTION, id)).catch(() => {});
        });
      }

      // Sort strictly by delivery date descending (latest date at top, oldest at bottom)
      proofs.sort(compareByDateDescending);

      updateCache(proofs);
      return proofs;
    } catch (err: any) {
      console.warn('[Firestore] Error or quota limit encountered during fetch:', err?.message || err);
      // Graceful error handling: If Firebase temporarily hits quota limit, reuse valid cached data
      const cached = inMemoryProofsCache || loadLocalCache();
      if (cached && cached.length > 0) {
        const clean = cached.filter(
          (p) => !p.id?.startsWith('proof-sample-') && !p.id?.includes('sample')
        );
        return [...clean].sort(compareByDateDescending);
      }
      throw err;
    } finally {
      inFlightProofsPromise = null;
    }
  })();

  return inFlightProofsPromise;
}

export async function getActivePublicProofsFromFirestore(forceRefresh = false): Promise<PublicProofData[]> {
  try {
    const allProofs = await getProofsFromFirestore(forceRefresh);
    return allProofs
      .filter((p) => p.status === 'active')
      .map((p) => ({
        id: p.id,
        customerId: p.customerId,
        customerName: p.customerName,
        serviceName: p.serviceName,
        deliveryDate: p.deliveryDate,
        notes: p.notes,
        screenshots: p.screenshots || [],
        verifiedAt: p.verifiedAt || p.createdAt,
        verificationHash: p.verificationHash,
      }));
  } catch (err) {
    console.error('[Firestore] Error fetching public proofs:', err);
    return getCachedProofsInstant();
  }
}

export async function getProofByCustomerIdFromFirestore(
  customerId: string
): Promise<ProofItem | null> {
  const cleanId = customerId.trim().toUpperCase();

  // 1. Instant check from local cache - 0 Firestore reads!
  const cached = inMemoryProofsCache || loadLocalCache();
  if (cached) {
    const found = cached.find((p) => p.customerId.toUpperCase() === cleanId || p.id === customerId);
    if (found) return found;
  }

  // 2. Only if not found in cache, make targeted query
  try {
    const proofsCol = collection(db, PROOFS_COLLECTION);
    const q = query(proofsCol, where('customerId', '==', cleanId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const item = { ...(docSnap.data() as ProofItem), id: docSnap.id };
      // Cache this individual record
      const currentList = inMemoryProofsCache || loadLocalCache() || [];
      if (!currentList.some((p) => p.id === item.id)) {
        updateCache([item, ...currentList]);
      }
      return item;
    }

    // Try finding by document id
    const directDoc = await getDoc(doc(db, PROOFS_COLLECTION, customerId));
    if (directDoc.exists()) {
      const item = { ...(directDoc.data() as ProofItem), id: directDoc.id };
      return item;
    }

    return null;
  } catch (err) {
    console.error('[Firestore] Error fetching proof by ID:', err);
    return null;
  }
}

export async function saveProofToFirestore(proof: ProofItem): Promise<void> {
  const cleanId = proof.id || `proof-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const cleanProof: ProofItem = {
    ...proof,
    id: cleanId,
    customerId: (proof.customerId || '').trim().toUpperCase(),
    serviceName: (proof.serviceName || 'Delivery Verification').trim(),
    deliveryDate: (
      proof.deliveryDate ||
      new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    ).trim(),
    screenshots: Array.isArray(proof.screenshots) ? proof.screenshots : [],
    status: proof.status || 'active',
    createdAt: proof.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    verifiedAt: proof.verifiedAt || new Date().toISOString(),
    verificationHash:
      proof.verificationHash ||
      Math.random().toString(36).substring(2) + Date.now().toString(36),
  };

  // Instantly push to in-memory & local persistent cache so UI renders with 0ms delay!
  const currentList = inMemoryProofsCache || loadLocalCache() || [];
  const existingIdx = currentList.findIndex((p) => p.id === cleanId || p.customerId === cleanProof.customerId);
  let updatedList: ProofItem[];
  if (existingIdx >= 0) {
    updatedList = [...currentList];
    updatedList[existingIdx] = cleanProof;
  } else {
    updatedList = [cleanProof, ...currentList];
  }
  updatedList.sort(compareByDateDescending);
  updateCache(updatedList);

  // Prepare sanitized payload for Firestore (no undefined values)
  const dataToSave: Record<string, any> = {
    id: cleanProof.id,
    customerId: cleanProof.customerId,
    serviceName: cleanProof.serviceName,
    deliveryDate: cleanProof.deliveryDate,
    screenshots: cleanProof.screenshots,
    status: cleanProof.status,
    createdAt: cleanProof.createdAt,
    updatedAt: cleanProof.updatedAt,
    verifiedAt: cleanProof.verifiedAt,
    verificationHash: cleanProof.verificationHash,
  };

  if (proof.customerName && typeof proof.customerName === 'string' && proof.customerName.trim()) {
    dataToSave.customerName = proof.customerName.trim();
  }
  if (proof.notes && typeof proof.notes === 'string' && proof.notes.trim()) {
    dataToSave.notes = proof.notes.trim();
  }

  try {
    const docRef = doc(db, PROOFS_COLLECTION, cleanId);
    await setDoc(docRef, dataToSave, { merge: true });
    console.log('[Firestore] Successfully permanently saved proof:', cleanId);
  } catch (err) {
    console.error('[Firestore] Error saving proof to Firestore:', err);
    throw err;
  }
}

export async function deleteProofFromFirestore(proofId: string): Promise<void> {
  // Remove from cache immediately
  const currentList = inMemoryProofsCache || loadLocalCache() || [];
  const updatedList = currentList.filter((p) => p.id !== proofId);
  updateCache(updatedList);

  try {
    const docRef = doc(db, PROOFS_COLLECTION, proofId);
    await deleteDoc(docRef);
    console.log('[Firestore] Successfully deleted proof from Firestore:', proofId);
  } catch (err) {
    console.error('[Firestore] Error deleting proof from Firestore:', err);
    throw err;
  }
}

export async function deleteMultipleProofsFromFirestore(proofIds: string[]): Promise<void> {
  if (!proofIds || proofIds.length === 0) return;

  // Remove from cache immediately for 0ms UI update
  const currentList = inMemoryProofsCache || loadLocalCache() || [];
  const updatedList = currentList.filter((p) => !proofIds.includes(p.id));
  updateCache(updatedList);

  // Parallel delete in Firestore
  await Promise.all(
    proofIds.map(async (id) => {
      try {
        const docRef = doc(db, PROOFS_COLLECTION, id);
        await deleteDoc(docRef);
      } catch (err) {
        console.error(`[Firestore] Error deleting proof ${id}:`, err);
      }
    })
  );
}

export async function removeScreenshotFromProof(
  proofId: string,
  screenshotIndex: number
): Promise<ProofItem | null> {
  const currentList = inMemoryProofsCache || loadLocalCache() || [];
  const existing = currentList.find((p) => p.id === proofId);
  if (!existing) return null;

  const newScreenshots = [...(existing.screenshots || [])];
  newScreenshots.splice(screenshotIndex, 1);

  if (newScreenshots.length === 0) {
    // If no screenshots remain, delete the entire proof document
    await deleteProofFromFirestore(proofId);
    return null;
  }

  const updatedProof: ProofItem = {
    ...existing,
    screenshots: newScreenshots,
    updatedAt: new Date().toISOString(),
  };

  await saveProofToFirestore(updatedProof);
  return updatedProof;
}
