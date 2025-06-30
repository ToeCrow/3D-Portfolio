import express from 'express';
import {
  getAllProjects,
  getProjectById,
  getImagesByProjectId
} from '../controllers/projectController';

const router = express.Router();

router.get('/', getAllProjects);

router.get('/:id/images', async (req, res) => {
  await getImagesByProjectId(req, res);
});

router.get('/:id', async (req, res) => {
  await getProjectById(req, res);
});

export default router;
