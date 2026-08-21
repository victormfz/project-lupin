const { BrowserWindow } = require('electron');
const path = require('node:path');

function createMainWindow({ isDev }) {
  const win = new BrowserWindow({
    icon: path.join(__dirname, '..', '..', 'renderer', 'src', 'assets', 'img', 'logo-pqn.png'),
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#313338', // tom neutro, evita flash branco ao abrir
    frame: false, // janela customizada, estilo Discord
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, '..', '..', 'preload', 'index.js'),
      contextIsolation: true,   // isola o mundo do renderer do Node.js
      nodeIntegration: false,   // nunca expor Node diretamente ao renderer
      sandbox: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    //win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, '..', '..', 'renderer', 'dist', 'index.html'));
  }

  return win;
}

module.exports = { createMainWindow };
