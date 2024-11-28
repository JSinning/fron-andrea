/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
// tslint:disable-next-line: no-implicit-dependencies
import { IpcRenderer } from 'electron';
import { PortInfo } from 'serialport';

export class SerialComClient {
  private renderer: IpcRenderer;

  constructor(renderer: IpcRenderer) {
    this.renderer = renderer;
  }

  public async getCOMPorts(): Promise<PortInfo[]> {
    return this.renderer.invoke('list_ports');
  }

  public connectToPort(path: string) {
    this.renderer.send('connect_to_port', path);
  }

  public disconnectPort() {
    this.renderer.send('disconnect_from_port');
  }

  public async isPortOpen(): Promise<boolean> {
    return this.renderer.invoke('is_port_open');
  }
}
