import express from 'express';
import { fetchRepos } from '../services/github';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const repos = await fetchRepos();
    res.json(repos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch repos');
  }
});

export default router;
