const { registerWindowControls } = require('./windowControls');
const { registerAppHandlers } = require('./appHandlers');

/**
 * Ponto único de registro de todos os handlers IPC.
 * Cada domínio (janela, app, futuramente auth/chat/etc.) fica em seu próprio arquivo.
 */
function registerIpcHandlers(ipcMain, context) {
  registerWindowControls(ipcMain, context);
  registerAppHandlers(ipcMain, context);
}

module.exports = { registerIpcHandlers };
