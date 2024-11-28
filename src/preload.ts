/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import { ipcRenderer } from 'electron';
import log from 'electron-log';
const { dialog } = require('electron').remote;

window.ipcRenderer = ipcRenderer;
window.dialog = dialog;
window.log = log;
// window.webContents = require('electron').remote.getCurrentWebContents();
