import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';
import { ProofItem, PublicProofData } from '../types';

const PROOFS_COLLECTION = 'proofs';

// Initial sample proofs to seed into Firestore if the database is brand new
const INITIAL_SAMPLE_PROOFS: ProofItem[] = [
  {
    id: 'proof-sample-nordvpn-1',
    customerId: 'TC-1025',
    customerName: 'Verified Customer',
    serviceName: 'NordVPN (1 Year Ultimate)',
    deliveryDate: 'September 24, 2026',
    notes: 'Premium 1-Year account activation credentials delivered. Zero tamper seal verified.',
    screenshots: ['/proof-exact-1.jpg'],
    status: 'active',
    createdAt: '2026-09-24T12:00:00.000Z',
    updatedAt: '2026-09-24T12:00:00.000Z',
    verifiedAt: '2026-09-24T12:00:00.000Z',
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  {
    id: 'proof-sample-capcut-2',
    customerId: 'TC-1026',
    customerName: 'Verified Customer',
    serviceName: 'CapCut Pro (Direct Mail Activation)',
    deliveryDate: 'September 25, 2026',
    notes: 'Instant account provisioning completed. Verified active license.',
    screenshots: ['/proof-capcut-24sep.svg'],
    status: 'active',
    createdAt: '2026-09-25T14:30:00.000Z',
    updatedAt: '2026-09-25T14:30:00.000Z',
    verifiedAt: '2026-09-25T14:30:00.000Z',
    verificationHash: '4a8b1c9f0d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a',
  },
];

let hasAttemptedSeed = false;

export async function getProofsFromFirestore(): Promise<ProofItem[]> {
  try {
    const proofsCol = collection(db, PROOFS_COLLECTION);
    const snapshot = await getDocs(proofsCol);

    if (snapshot.empty && !hasAttemptedSeed) {
      hasAttemptedSeed = true;
      console.log('[Firestore] Database is empty. Seeding initial verified proofs...');
      for (const sample of INITIAL_SAMPLE_PROOFS) {
        await setDoc(doc(db, PROOFS_COLLECTION, sample.id), sample);
      }
      return INITIAL_SAMPLE_PROOFS;
    }

    const proofs: ProofItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as ProofItem;
      proofs.push({
        ...data,
        id: data.id || docSnap.id,
      });
    });

    // Sort by createdAt descending
    proofs.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return proofs;
  } catch (err) {
    console.error('[Firestore] Error fetching proofs:', err);
    throw err;
  }
}

export async function getActivePublicProofsFromFirestore(): Promise<PublicProofData[]> {
  try {
    const allProofs = await getProofsFromFirestore();
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
    return [];
  }
}

export async function getProofByCustomerIdFromFirestore(
  customerId: string
): Promise<ProofItem | null> {
  try {
    const cleanId = customerId.trim().toUpperCase();
    const proofsCol = collection(db, PROOFS_COLLECTION);
    const q = query(proofsCol, where('customerId', '==', cleanId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return { ...(docSnap.data() as ProofItem), id: docSnap.id };
    }

    // Try finding by document id
    const directDoc = await getDoc(doc(db, PROOFS_COLLECTION, customerId));
    if (directDoc.exists()) {
      return { ...(directDoc.data() as ProofItem), id: directDoc.id };
    }

    return null;
  } catch (err) {
    console.error('[Firestore] Error fetching proof by ID:', err);
    return null;
  }
}

export async function saveProofToFirestore(proof: ProofItem): Promise<void> {
  try {
    const cleanId = proof.id || `proof-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const dataToSave: Record<string, any> = {
      id: cleanId,
      customerId: (proof.customerId || '').trim().toUpperCase(),
      serviceName: (proof.serviceName || 'Delivery Verification').trim(),
      deliveryDate: (proof.deliveryDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })).trim(),
      screenshots: Array.isArray(proof.screenshots) ? proof.screenshots : [],
      status: proof.status || 'active',
      createdAt: proof.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      verifiedAt: proof.verifiedAt || new Date().toISOString(),
      verificationHash:
        proof.verificationHash ||
        Math.random().toString(36).substring(2) + Date.now().toString(36),
    };

    // Only attach optional fields if they have a non-empty string value (Firestore rejects undefined)
    if (proof.customerName && typeof proof.customerName === 'string' && proof.customerName.trim()) {
      dataToSave.customerName = proof.customerName.trim();
    }
    if (proof.notes && typeof proof.notes === 'string' && proof.notes.trim()) {
      dataToSave.notes = proof.notes.trim();
    }

    // Safety sweep: strip out any undefined keys whatsoever
    Object.keys(dataToSave).forEach((key) => {
      if (dataToSave[key] === undefined) {
        delete dataToSave[key];
      }
    });

    const docRef = doc(db, PROOFS_COLLECTION, cleanId);
    await setDoc(docRef, dataToSave, { merge: true });
    console.log('[Firestore] Successfully permanently saved proof:', cleanId);
  } catch (err) {
    console.error('[Firestore] Error saving proof to Firestore:', err);
    throw err;
  }
}

export async function deleteProofFromFirestore(proofId: string): Promise<void> {
  try {
    const docRef = doc(db, PROOFS_COLLECTION, proofId);
    await deleteDoc(docRef);
    console.log('[Firestore] Successfully deleted proof from Firestore:', proofId);
  } catch (err) {
    console.error('[Firestore] Error deleting proof from Firestore:', err);
    throw err;
  }
}
