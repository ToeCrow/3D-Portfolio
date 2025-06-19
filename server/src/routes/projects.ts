import express from 'express';
import { fetchRepos } from '../services/github';
import db from '../db/db';

const router = express.Router();

router.get('/github', async (req, res) => {
  try {
    const repos = await fetchRepos();
    res.json(repos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch repos');
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, name, description, github_url, image_url, repo_type, tags, status, created_at, updated_at, color
      FROM projects ORDER BY id ASC
`);
res.json(result.rows);

  } catch (error) {
    console.error('Failed to fetch projects', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
