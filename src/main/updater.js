const { autoUpdater } = require('electron-updater');

function setupAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();
}

module.exports = { setupAutoUpdater };
