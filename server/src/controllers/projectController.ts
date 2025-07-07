import { Request, Response } from 'express';
import db from '../db/db';  // Anpassa sökväg efter din projektstruktur

// Hämta alla projekt
export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const result = await db.query(`
      SELECT * FROM projects ORDER BY id ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch projects', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Hämta ett projekt via ID
export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await db.query(`
      SELECT * FROM projects WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Projektet hittades inte' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Failed to fetch project by id', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Hämta alla bilder för ett projekt via ID
export const getImagesByProjectId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await db.query(`
      SELECT * FROM images WHERE project_id = $1 ORDER BY id ASC
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inga bilder hittades för detta projekt' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch images for project', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
