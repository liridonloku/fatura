/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import fs from 'fs';
import { app, BrowserWindow, shell, ipcMain, dialog, protocol } from 'electron';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

let mainWindow: BrowserWindow | null = null;

ipcMain.handle('save-to-pdf', async (_event, args) => {
  //  Set default save path to documents/{invoiceNo}.pdf
  const defaultPath = path.join(
    app.getPath('documents'),
    `/${args[0].invoiceNo}.pdf`
  );

  //  Get focused window
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    //  Get final save path via system dialog
    const savePath = dialog.showSaveDialogSync(win, {
      defaultPath,
    });

    //  Start printing
    win.webContents
      .printToPDF({
        marginsType: 2,
        pageSize: 'A4',
      })
      .then((data) => {
        if (savePath) {
          //  User has saved the file
          fs.writeFile(savePath, data, (err) => {
            if (err) {
              console.log(err);
              return err;
            }
            return 'File successfully saved';
          });
        }
        //  User has canceled saving
        return 'Save canceled';
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  return 'File not saved';
});

/**
 *  Will not work if device doesn't have a default printer, we'll be using
 *  window.print() from the renderer instead. Keeping this function in case
 *  a solution is found
 */
ipcMain.handle('print', async () => {
  const win = BrowserWindow.getFocusedWindow();
  const options = {
    silent: false,
    printBackground: false,
    color: false,
    margin: {
      marginType: 'printableArea',
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
    header: 'Header of the Page',
    footer: 'Footer of the Page',
  };
  win?.webContents.print(options, (success, error) => {
    if (!success) return error;
    return 'Print successful';
  });
});

ipcMain.handle('upload-logo', async (_event, args) => {
  if (args.length === 0) return Error('No image found');

  //  Get uploaded logo path and extension
  const filePath = args[0];
  const extension = args[1];
  const newLogoName = args[2];
  const oldLogo = args[3].slice(8);
  console.log(newLogoName, oldLogo);

  //  Get system specific folder for user data
  const userDataPath = app.getPath('userData');

  //  Delete old logo
  if (oldLogo) {
    fs.rmSync(oldLogo);
  }

  try {
    const file = fs.readFileSync(filePath);

    //  Create save folder if it doesn't exist
    const folder = path.join(userDataPath, '/fatura');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    //  Save logo at userData/Electron/fatura/newLogoName
    const savePath = path.join(
      userDataPath,
      `/fatura/${newLogoName}.${extension}`
    );
    fs.writeFileSync(savePath, file);

    return savePath;
  } catch (error) {
    return error;
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove menu on linux and windows (not possible in OSX?)
  mainWindow.removeMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
    // Use custom protocol to display local file
    protocol.registerFileProtocol('atom', (request, callback) => {
      const url = request.url.substr(7);
      // eslint-disable-next-line promise/no-callback-in-promise
      callback(decodeURI(path.normalize(url)));
    });
  })
  .catch(console.log);
