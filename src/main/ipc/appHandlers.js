const { app } = require('electron');
const { IPC_CHANNELS } = require('../../shared/ipcChannels');

function registerAppHandlers(ipcMain) {
  ipcMain.handle(IPC_CHANNELS.APP_GET_VERSION, () => app.getVersion());
}

module.exports = { registerAppHandlers };
