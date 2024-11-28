<!-- /*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/ -->
<template>
  <div class="flex flex-row flex-wrap justify-between items-center">
    <div class="flex items-center gap-4">
      <button class="btn-save m-0" @click="disconnectPort">Desconectar</button>
      <select
        class="select m-0"
        v-model="portPath"
        @focus="discoverPorts()"
        @blur="discoverPorts"
      >
        <option
          v-for="(port, index) in ports"
          v-bind:value="port.path"
          v-bind:key="`port-${index}`"
        >
          {{ port.path }}
        </option>
      </select>
      <button ref="connectPort" class="btn-save m-0" @click="connectToPort">
        Conectar
      </button>
      <input
        type="text"
        disabled
        class="input"
        v-model="connectedDisconnected"
      />
    </div>
  </div>
</template>

<script lang="ts">
import SerialPort from 'serialport';
import { Component, Ref, Vue, Model } from 'vue-property-decorator';

const { ipcRenderer } = window;

@Component({
  name: 'Ports',
})
export default class Ports extends Vue {
  @Ref('connectPort') public readonly btnConnectPort!: HTMLButtonElement;
  @Model('change', { type: Number }) public readonly model!: number;
  public ports: SerialPort.PortInfo[] = [];
  public portPath: string = '';
  public isPortConnected: boolean = false;
  public output: string = '';
  public isError: boolean = false;

  public showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  public async mounted() {
    await this.discoverPorts();
    this._serialPortListener();
    const portFromLocalDB = await this.$local.getCurrentBasculaConnectionPort();
    if (portFromLocalDB !== undefined && portFromLocalDB !== '') {
      this.portPath = portFromLocalDB;
      this.btnConnectPort.click();
    }
  }

  public beforeDestroy() {
    // Remove listener to avoid duplication and memory leaks and then subscribe to them again
    ipcRenderer.removeAllListeners('port_connected');
    ipcRenderer.removeAllListeners('serial_data_utf8');
  }

  public async discoverPorts() {
    this.ports = await this.$serial.getCOMPorts();
  }

  public connectToPort() {
    if (this.portPath === '') {
      this.showOutput(false, 'Debe seleccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }

  public get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  public disconnectPort() {
    this.$serial.disconnectPort();
    this.isPortConnected = false;
  }

  public _serialPortListener() {
    ipcRenderer.on('port_connected', async () => {
      const isPortOpen = await this.$serial.isPortOpen();
      if (!isPortOpen) {
        this.showOutput(
          true,
          'No se ha podido establecer comunicación con el puerto seleccionado.',
        );
        this.isPortConnected = false;
        return;
      }

      this.isPortConnected = true;
      this.$local.saveCurrentBasculaConnectionPort(this.portPath);
    });

    ipcRenderer.on('serial_data_utf8', (_, data: string) => {
      this.$emit('change', Number(data));
    });
  }
}
</script>
