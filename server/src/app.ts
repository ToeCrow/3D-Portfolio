import express from 'express';
import cors from 'cors';
import projectRouter from './routes/projectRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/projects', projectRouter);

export default app;
