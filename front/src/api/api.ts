/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const initData = window.Telegram.WebApp.initData;
const initDataObj = Object.fromEntries(new URLSearchParams(initData));
const userId = initDataObj.user ? JSON.parse(initDataObj.user).id : null;

export const client = axios.create({
  baseURL: 'https://epdtml-89-22-142-35.ru.tuna.am',
});

export const postGameStateInitialization = async () => {
  try {
    return await client.post('/initialization', { userId });
  } catch (err) {
    console.error('Error sign up:', err);
    return null;
  }
};

export const getGameState = async () => {
  try {
    return await client.post('/game-state', { userId });
  } catch (err) {
    console.error('Error get GameState:', err);
    return null;
  }
};

export const postSaveGame = async (gameState: any) => {
  const payload = JSON.stringify({ userId, gameState });
  const blob = new Blob([payload], { type: 'application/json' });

  try {
    const success = navigator.sendBeacon('/save-game', blob);

    if (!success) {
      console.error('Ошибка отправки данных с помощью sendBeacon');
    }
  } catch (err) {
    console.error('Ошибка сохранения игры:', err);
  }
};
