const { contextBridge, ipcRenderer } = require('electron');
const { IPC_CHANNELS } = require('../shared/ipcChannels');

// Única ponte entre renderer e o mundo Node/Electron.
// O renderer NUNCA tem acesso direto a `require`, fs, etc.
contextBridge.exposeInMainWorld('api', {
  window: {
    minimize: () => ipcRenderer.send(IPC_CHANNELS.WINDOW_MINIMIZE),
    maximize: () => ipcRenderer.send(IPC_CHANNELS.WINDOW_MAXIMIZE),
    close: () => ipcRenderer.send(IPC_CHANNELS.WINDOW_CLOSE),
  },
  app: {
    getVersion: () => ipcRenderer.invoke(IPC_CHANNELS.APP_GET_VERSION),
  },
});
