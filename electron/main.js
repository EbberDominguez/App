const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Opcional
      nodeIntegration: true, // Permite usar Node.js en el renderer (tener cuidado con la seguridad)
    },
  });

  // Ocultar el menú principal
  mainWindow.setMenu(null);

  // Maximizar la ventana al abrir
  mainWindow.maximize();

  // Mostrar la ventana después de maximizarla
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  
  // Cargar la aplicación Angular desde la carpeta "dist"
  mainWindow.loadFile(path.join(__dirname, '../dist/mi-proyecto-angular/browser/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });
