import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wish } = req.body || {};
  if (!wish || !wish.trim()) {
    return res.status(400).json({ error: 'Wish is required' });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL not configured' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    await sql`
      CREATE TABLE IF NOT EXISTS wishes (
        id BIGSERIAL PRIMARY KEY,
        wish TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

    const inserted = await sql`
      INSERT INTO wishes (wish)
      VALUES (${wish.trim()})
      RETURNING id, wish, created_at;
    `;

    return res.status(201).json({ ok: true, wish: inserted[0] });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save wish', details: error.message });
  }
}
