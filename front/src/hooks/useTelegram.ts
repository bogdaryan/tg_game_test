const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onClick = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return {
    onClick,
    onToggleButton,
    tg,
    user: tg.initDataUnsafe.user,
  };
}
