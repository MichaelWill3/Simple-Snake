const { app, BrowserWindow } = require('electron');

function createMainWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 520,
    resizable: false,
    backgroundColor: '#111111',
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
  if (process.platform !== 'darwin') app.quit();
});


