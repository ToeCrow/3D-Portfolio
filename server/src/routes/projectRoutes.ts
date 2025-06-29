import express from 'express';
import {
  getAllProjects,
  getProjectById,
  getImagesByProjectId
} from '../controllers/projectController';

console.log('Project routes loaded');

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', async (req, res, next) => {
  await getProjectById(req, res);
  next();
});
router.get('/:id/images', async (req, res) => {
  await getImagesByProjectId(req, res);
});

console.log('Router keys:', Object.keys(router));

export default router;
