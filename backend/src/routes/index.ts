import { Request, Response, Router } from 'express';
import { DataSource } from 'typeorm';
import { Player } from '../entities/player.entity';
import { Collectibles } from '../entities/collectibles.entity';

const rootRouter = (AppDataSource: DataSource) => {
  const router = Router();

  const playerRepository = AppDataSource.getRepository(Player);

  router.post('/initialization', async (req: Request, res: Response) => {
    try {
      const userId = req.body.userId;
      const existingPlayer = await playerRepository.findOne({
        where: { tgUserId: userId },
        relations: ['collectibles'],
      });

      if (existingPlayer) {
        res.status(200).send(existingPlayer);
      } else {
        const player = playerRepository.create({ tgUserId: userId });
        const result = await playerRepository.save(player);
        res.status(201).send(result);
      }
    } catch (err) {
      res.status(500).send('Ошибка сервера');
    }
  });

  router.post('/save-game', async (req: Request, res: Response) => {
    try {
      const { userId, gameState } = req.body;

      const player = await playerRepository.findOne({
        where: { tgUserId: userId },
        relations: ['collectibles'],
      });

      if (!player) {
        res.status(404).send('Пользователь не найден');
        return;
      }

      player.posX = gameState.playerPos.x;
      player.posY = gameState.playerPos.y;
      player.bananaCount = gameState.bananaCount;

      // player.collectibles = gameState.collectibles.map(
      //   (collectible: { x: number; y: number }) => {
      //     return { x: collectible.x, y: collectible.y, player: player };
      //   }
      // );

      await playerRepository.save(player);

      console.log('good');

      res.status(200).send(player);
    } catch (err) {
      console.error('Ошибка при сохранении состояния игры:', err);
      res.status(500).send('Ошибка сервера');
    }
  });

  return router;
};

export default rootRouter;
