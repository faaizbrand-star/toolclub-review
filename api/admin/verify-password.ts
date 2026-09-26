export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // Ignore JSON parse error on raw body
      }
    }

    const password = body?.password ? String(body.password).trim() : '';

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (password === 'bsse5038') {
      const token = `tk_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
      return res.status(200).json({ success: true, token });
    }

    return res.status(401).json({ error: 'Incorrect Admin Password. Access Denied.' });
  } catch (err: any) {
    return res.status(200).json({
      error: 'Incorrect Admin Password. Access Denied.',
    });
  }
}
