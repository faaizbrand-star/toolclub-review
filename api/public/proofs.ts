import fs from 'fs';
import path from 'path';

// Read data/db.json
const dbPath = path.resolve(process.cwd(), 'data', 'db.json');

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'public, max-age=15, stale-while-revalidate=60');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
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
      return res.status(200).json({ proofs });
    }
  } catch {}

  return res.status(200).json({ proofs: [] });
}
