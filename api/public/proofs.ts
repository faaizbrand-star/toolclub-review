import fs from 'fs';
import path from 'path';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

let memoryCache: any[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds server in-memory cache

function getFirestoreDb() {
  try {
    const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) return null;
    const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const app = getApps().length > 0 ? getApps()[0] : initializeApp(cfg);
    return getFirestore(app, cfg.firestoreDatabaseId || '(default)');
  } catch (err) {
    console.error('Failed to init Firestore in API handler:', err);
    return null;
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=60, stale-while-revalidate=300');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Instant response from server memory cache if fresh
  if (memoryCache && (Date.now() - lastCacheTime < CACHE_TTL_MS)) {
    return res.status(200).json({ proofs: memoryCache });
  }

  // 2. Fetch directly from Firestore (loads fast on server fiber connection)
  try {
    const firestoreDb = getFirestoreDb();
    if (firestoreDb) {
      const q = query(collection(firestoreDb, 'proofs'), orderBy('createdAt', 'desc'), limit(40));
      const snap = await getDocs(q);
      const proofs: any[] = [];
      snap.forEach((docSnap) => {
        const data = docSnap.data();
        const docId = data.id || docSnap.id;
        if (docId.startsWith('proof-sample-') || docId.includes('sample')) return;
        if (data.status !== 'active') return;
        proofs.push({
          id: docId,
          customerId: data.customerId,
          customerName: data.customerName,
          serviceName: data.serviceName,
          deliveryDate: data.deliveryDate,
          notes: data.notes,
          screenshots: data.screenshots || [],
          verifiedAt: data.verifiedAt || data.createdAt,
          verificationHash: data.verificationHash,
        });
      });

      if (proofs.length > 0) {
        memoryCache = proofs;
        lastCacheTime = Date.now();
        return res.status(200).json({ proofs });
      }
    }
  } catch (err) {
    console.error('Error fetching proofs from Firestore in api:', err);
  }

  // 3. Fallback to data/db.json if available
  try {
    const dbPath = path.resolve(process.cwd(), 'data', 'db.json');
    if (fs.existsSync(dbPath)) {
      const raw = fs.readFileSync(dbPath, 'utf-8');
      const db = JSON.parse(raw);
      const proofs = (db.proofs || [])
        .filter((p: any) => p.status === 'active' && !p.id?.startsWith('proof-sample-') && !p.id?.includes('sample'))
        .map((p: any) => ({
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
      if (proofs.length > 0) {
        return res.status(200).json({ proofs });
      }
    }
  } catch {}

  // If memory cache exists even if older, return it as fallback
  if (memoryCache && memoryCache.length > 0) {
    return res.status(200).json({ proofs: memoryCache });
  }

  return res.status(200).json({ proofs: [] });
}
