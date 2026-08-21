// Fonte única da verdade para nomes de canais IPC.
// Evita strings soltas espalhadas pelo código e erros de digitação.
const IPC_CHANNELS = {
  WINDOW_MINIMIZE: 'window:minimize',
  WINDOW_MAXIMIZE: 'window:maximize',
  WINDOW_CLOSE: 'window:close',
  APP_GET_VERSION: 'app:get-version',
};

module.exports = { IPC_CHANNELS };
