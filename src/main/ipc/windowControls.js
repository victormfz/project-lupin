const { IPC_CHANNELS } = require('../../shared/ipcChannels');

function registerWindowControls(ipcMain, { mainWindow }) {
  ipcMain.on(IPC_CHANNELS.WINDOW_MINIMIZE, () => mainWindow.minimize());

  ipcMain.on(IPC_CHANNELS.WINDOW_MAXIMIZE, () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on(IPC_CHANNELS.WINDOW_CLOSE, () => mainWindow.close());
}

module.exports = { registerWindowControls };
