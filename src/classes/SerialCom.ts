/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
// tslint:disable-next-line: no-implicit-dependencies
import { IpcMain, WebContents } from 'electron';
import Serialport, { PortInfo } from 'serialport';
import { captureMessage, Severity } from '@sentry/browser';
import { ElectronLog } from 'electron-log';

export class SerialCom {
  private ipcMain: IpcMain;
  private webContents: WebContents;
  private port: Serialport | undefined;
  private baudRate: number = 9600;
  private log: ElectronLog;

  private currentData: string = '';
  private hasBreakLine: boolean = false;

  constructor(ipcMain: IpcMain, webContents: WebContents, log: ElectronLog) {
    this.ipcMain = ipcMain;
    this.webContents = webContents;
    this.log = log;

    this._initializeListeners();
  }

  public setBaudRate(value: number) {
    this.baudRate = value;
  }

  public connectToPort(path: string) {
    this.disconnectPort();
    this.port = new Serialport(
      path,
      {
        baudRate: this.baudRate,
      },
      (err) => this.webContents.send('port_connected'),
    );
    this.port.open((err) => {
      if (!err) {
        return;
      }
    });
  }

  private _initializePortListeners() {
    this._onData();
    this._onOpenPort();
  }

  private _initializeListeners() {
    this._onListPortsListener();
    this._onConnectToPortListener();
    this._onDisconnectFromPortListener();
    this._onPortIsOpenListener();
  }

  private async getCOMPorts(): Promise<PortInfo[]> {
    return Serialport.list();
  }

  private disconnectPort() {
    if (typeof this.port === 'undefined' || !this.port.isOpen) {
      return;
    }
    this.port.removeAllListeners();
    this.port.close();
    this.port.destroy();
  }

  private isPortOpen(): boolean {
    if (typeof this.port === 'undefined') {
      return false;
    }
    if (this.port.isOpen) {
      this._initializePortListeners();
    }
    return this.port.isOpen;
  }

  private _onOpenPort() {
    if (typeof this.port === 'undefined') {
      return;
    }
    this.port.on('open', () => {
      this.webContents.send('port_connected', true);
    });
  }

  private _onData() {
    if (typeof this.port === 'undefined') {
      return;
    }
    this.port.on('data', (data: any) => {
      this.log.info(`Data received from weighing machine: ${data}`);
      this.processData(data.toString());
    });
  }

  private processData(data: string) {
    const c = this.formatComData(data);
    if (c[0] !== '.') {
      this.currentData += c;
      const l = this.currentData.split('.');
      if (l.length > 1) {
        if (l[0].length > 0 && l[1].length > 1) {
          this.sendDataWhenReady(this.currentData);
          this.currentData = '';
          return;
        }
      }
    } else {
      this.currentData += c;
      this.sendDataWhenReady(this.currentData);
      this.currentData = '';
    }
  }

  private sendDataWhenReady(data: string) {
    this.webContents.send('serial_data_utf8', this.formatComData(data));
  }

  private formatComData(data: string): string {
    const dataRead = Buffer.from(data, 'utf-8').toString().trim().split('');
    const validData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    let composedData = '';
    dataRead.forEach((char) => {
      if (validData.includes(char)) {
        composedData += char;
      }
    });
    return composedData !== '' ? composedData : '0';
  }

  private _onListPortsListener() {
    this.ipcMain.handle('list_ports', (unusedEvent, unusedData: any) => {
      return this.getCOMPorts();
    });
  }

  private _onConnectToPortListener() {
    this.ipcMain.on('connect_to_port', (unusedEvent, path: string) => {
      this.connectToPort(path);
    });
  }

  private _onDisconnectFromPortListener() {
    this.ipcMain.on('disconnect_from_port', (unusedEvent, unusedData: any) => {
      this.disconnectPort();
    });
  }

  private _onPortIsOpenListener() {
    this.ipcMain.handle('is_port_open', () => {
      return this.isPortOpen();
    });
  }
}
