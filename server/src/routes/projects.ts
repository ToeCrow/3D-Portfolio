import express from 'express';
import db from '../db/db';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, name, description, github_url, image_url, repo_type, tags, status, created_at, updated_at, color, orbital_period_days, radiuskm, moons, map_url 
      FROM projects ORDER BY id ASC
`);
res.json(result.rows);

  } catch (error) {
    console.error('Failed to fetch projects', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
