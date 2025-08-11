const { app, BrowserWindow } = require('electron');

const WINDOW_WIDTH = 480;
const WINDOW_HEIGHT = 520;
const WINDOW_BACKGROUND = '#111111';
const MAC_PLATFORM = 'darwin';

function createMainWindow() {
  const win = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    resizable: false,
    backgroundColor: WINDOW_BACKGROUND,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
    show: false,
  });

  win.once('ready-to-show', () => win.show());

  win.loadFile('public/index.html');
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== MAC_PLATFORM) app.quit();
});


