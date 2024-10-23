import { useEffect } from 'react';
// import { useTelegram } from '../../hooks/useTelegram';
import styles from './app.module.css';
import config from '../../PhaserGame';

function App() {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <>
      <div id="phaser-container" className={styles.app}></div>
    </>
  );
}

export default App;
