import { Request, Response, Router } from 'express';
import { DataSource } from 'typeorm';
import { Player } from '../entities/player.entity';

const rootRouter = (AppDataSource: DataSource) => {
  const router = Router();

  router.post('/player', async (req: Request, res: Response) => {});

  router.get('/player', async (req, res) => {});

  return router;
};

export default rootRouter;
