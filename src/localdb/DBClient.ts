/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import { IpcRenderer } from 'electron';
import LocalReports from '../classes/LocalReports';
import UserInfo from '../classes/UserInfo';

import { GET_LOCALREPORTS, UPDATE_LOCALREPORTS } from './DB';

export default class DBClient {
  private renderer: IpcRenderer;

  constructor(renderer: IpcRenderer) {
    this.renderer = renderer;
  }

  public saveLocalReportInfo(info: LocalReports) {
    this.renderer.send(UPDATE_LOCALREPORTS, info);
  }

  public saveUserInfo(user: UserInfo) {
    this.renderer.send('update_userinfo', user);
  }

  public saveCurrentBasculaConnectionPort(port: string) {
    this.renderer.send('update_port_info', port);
  }

  public async getUserInfo(): Promise<UserInfo | number> {
    try {
      return await this.renderer.invoke('get_userinfo');
    } catch (e) {
      return -1;
    }
  }

  public async getCurrentBasculaConnectionPort(): Promise<string> {
    try {
      return await this.renderer.invoke('get_port_info');
    } catch (e) {
      return '';
    }
  }

  public async getLocalReportInfo(): Promise<LocalReports | string> {
    try {
      return await this.renderer.invoke(GET_LOCALREPORTS);
    } catch (e) {
      return e.message ?? 'No data was found';
    }
  }
}
