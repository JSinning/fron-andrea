/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
'use strict';

import fs from 'fs';
import { SerialCom } from './classes/SerialCom';
import DB from './localdb/DB';

import {
  app,
  BrowserWindow,
  ipcMain,
  protocol,
  globalShortcut,
} from 'electron';
import Store from 'electron-store';
import path from 'path';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

import { exec } from 'child_process';
import log from 'electron-log';

// import { parsedSettings } from '@/consts';
console.log(app.getPath('userData'));

// Setup local db
const isDevelopment = process.env.NODE_ENV !== 'production';
app.allowRendererProcessReuse = false;

// console.log(parsedSettings);
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: any;

const store = new Store({
  cwd: 'db',
});

const db = new DB(ipcMain, store);
db.initializeDBListeners();

/*ipcMain.on('port_connected', (_event, _flag) => {
  win.webContents.send('port_connected_info')
})*/

/*ipcMain.on('serial_data', (_event, data) => {
  win.webContents.send('serial_data_utf8', data
})*/
ipcMain.on('save_pdf', async (unusedEvent, pdfPath) => {
  const pdfTempPath =
    process.platform === 'win32' ? 'C:/tmp/pdftest.pdf' : '/tmp/pdftest.pdf';
  fs.writeFile(pdfTempPath, Buffer.from(pdfPath, 'base64'), async (error) => {
    if (error) {
      console.error(error);
      return;
    }
    switch (process.platform) {
      case 'darwin':
      case 'linux':
        exec('lp /tmp/pdftest.pdf', (e) => {
          if (e) {
            throw e;
          }
        });
        break;
      case 'win32':
        exec(
          `"C:\\Program Files (x86)\\Foxit Software\\Foxit Reader\\Foxit Reader.exe" /p ${pdfTempPath}`,
          (e) => {
            if (e) {
              throw e;
            }
          },
        );
        break;
      default:
        throw new Error('Platform not supported.');
    }
  });
});

ipcMain.on('preview_pdf', async (unusedEvent, pdfBase64) => {
  let pdfWindow: BrowserWindow | any = new BrowserWindow({
    height: 720,
    webPreferences: {
      plugins: true,
    },
    width: 1200,
  });

  try {
    await pdfWindow.loadURL('data:application/pdf;base64,' + pdfBase64);

    pdfWindow.on('closed', () => {
      pdfWindow = null;
    });
  } catch (error) {
    console.error(error);
  }
});

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

function createWindow(currentDb: DB) {
  // Create the browser window.
  win = new BrowserWindow({
    height: 800,
    icon: 'src/assets/andreaicon.ico',
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 1280,
  });

  // Serial Port communication
  const serial = new SerialCom(ipcMain, win.webContents, log);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools();
    }
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL(`file://${__dirname}/index.html`);
    win.setMenu(null);
  }

  const ret = globalShortcut.register('CommandOrControl+Shift+I', () => {
    win.webContents.openDevTools();
  });

  win.on('close', () => {
    currentDb.resetUserToken();
  });

  win.on('closed', async () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow(db);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow(db);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
