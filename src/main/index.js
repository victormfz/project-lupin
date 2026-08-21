const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('node:path');
const { createMainWindow } = require('./windows/mainWindow');
const { registerIpcHandlers } = require('./ipc');
const { setupAutoUpdater } = require('./updater');

const isDev = process.argv.includes('--dev');

let mainWindow = null;

function bootstrap() {
  mainWindow = createMainWindow({ isDev });
  registerIpcHandlers(ipcMain, { mainWindow });

  if (!isDev) {
    setupAutoUpdater();
  }
}

// Garante instância única do app (evita abrir várias janelas)
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(bootstrap);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) bootstrap();
  });

  // Abre links externos no navegador padrão, nunca dentro do app
  app.on('web-contents-created', (_event, contents) => {
    contents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });
  });
}
