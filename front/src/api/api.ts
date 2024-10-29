/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const initData = window.Telegram.WebApp.initData;
const initDataObj = Object.fromEntries(new URLSearchParams(initData));
const userId = initDataObj.user ? JSON.parse(initDataObj.user).id : null;

export const client = axios.create({
  baseURL: 'https://dsrvs4-38-180-116-142.ru.tuna.am',
});

export const postGameStateInitialization = async () => {
  try {
    return await client.post('/initialization', { userId });
  } catch (err) {
    console.error('Error sign up:', err);
    return null;
  }
};

export const postSaveGame = async (gameState: any) => {
  const payload = JSON.stringify({ userId, gameState });
  // const blob = new Blob([payload], { type: 'application/json' });

  try {
    navigator.sendBeacon(
      'https://dsrvs4-38-180-116-142.ru.tuna.am/save-game',
      payload
    );
  } catch (err) {
    console.error('Ошибка сохранения игры:', err);
  }
};
