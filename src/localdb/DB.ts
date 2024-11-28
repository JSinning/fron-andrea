/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import { HOST, VERSION } from '@/consts';
import { IpcMain } from 'electron';
import Store from 'electron-store';
import LocalReports from '../classes/LocalReports';
import Settings from '../classes/Settings';
import UserInfo from '../classes/UserInfo';

export const UPDATE_LOCALREPORTS: string = 'update_localreports';
export const GET_LOCALREPORTS: string = 'get_localreports';

export default class DB {
  public main: IpcMain;
  public store: Store;

  constructor(main: IpcMain, db: Store) {
    this.main = main;
    this.store = db;
  }

  public initializeDBListeners() {
    this._handleUserInfo();
    this._listenToUserInfo();
    this._handlePortInfo();
    this._listenToPortInfo();
    this._initializeHostAndDB();
    this._initializeSettings();

    // Registers listeners to the Local Reports
    this._handleReports();
    this._listenToUpdateReports();
  }

  public async resetUserToken() {
    const user = this.store.get('userinfo');
    user.pass = '';
    user.authToken = '';
    this.store.set('userinfo', user);
  }

  private _initializeSettings() {
    const settings: Settings = this.store.get('settings', new Settings());
    if (settings.api !== '') {
      return;
    }
    settings.api = HOST;
    settings.apiVersion = VERSION;
    this.store.set('settings', settings);
  }

  private _initializeHostAndDB(): void {
    // Validate if the userinfo is empty, we don't want to override if the file has been changed
    const userInfo: UserInfo = this.store.get('userinfo', new UserInfo());
    if (userInfo.host !== '' || userInfo.db !== '') {
      return;
    }
    userInfo.host = '190.121.135.162';
    userInfo.db = 'ANDREAFRIGODEV';
    this.store.set('userinfo', userInfo);
  }

  private _listenToPortInfo() {
    this.main.on(
      'update_port_info',
      (_: Electron.IpcMainInvokeEvent, data: string) => {
        this.store.delete('user_port');
        this.store.set('user_port', data);
      },
    );
  }

  private _handlePortInfo() {
    this.main.handle(
      'get_port_info',
      async (nonUsedEvent: Electron.IpcMainInvokeEvent, data: any[]) => {
        return this.store.get('user_port');
      },
    );
  }

  private _listenToUserInfo() {
    this.main.on(
      'update_userinfo',
      (_: Electron.IpcMainEvent, data: UserInfo) => {
        this.store.delete('userinfo');
        this.store.set('userinfo', data);
      },
    );
  }

  private _handleUserInfo() {
    this.main.handle(
      'get_userinfo',
      async (event: Electron.IpcMainInvokeEvent, data: any[]) => {
        return this.store.get('userinfo');
      },
    );
  }

  private _listenToUpdateReports() {
    this.main.on(
      UPDATE_LOCALREPORTS,
      (_: Electron.IpcMainEvent, data: LocalReports) => {
        this.store.delete('reports');
        this.store.set('reports', data);
      },
    );
  }

  private _handleReports() {
    this.main.handle(
      'get_localreports',
      async (event: Electron.IpcMainInvokeEvent, data: any[]) => {
        return this.store.get('reports');
      },
    );
  }
}
