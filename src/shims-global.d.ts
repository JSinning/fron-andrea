/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import { IpcRenderer, BrowserWindow } from 'electron';
import { ElectronLog } from 'electron-log';
import SerialPort from 'serialport';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
    serialPort: SerialPort;
    webContents: BrowserWindow;
    dialog: any;
    log: ElectronLog;
  }
}
