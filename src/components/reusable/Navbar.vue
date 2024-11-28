<template>
  <div class="toogle-menu shadow-xs">
    <div class="flex flex-col justify-center ml-2">
      <button @click="toggleSidebar" class="focus:border-none">
        <img class="h-8" src="@/assets/img/menu_bars.svg" alt="Toggle Left" />
      </button>
    </div>
    <div class="flex flex-col items-center justify-center mb-2 mr-6">
      <button class="btn-primary" @click="back">Atras</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Navbar',
})
export default class Navbar extends Vue {
  @Prop(Function) public toggleSidebar: () => void;

  public async back() {
    const exitAnswer = await window.dialog.showMessageBox({
      buttons: ['Aceptar', 'Cancelar'],
      cancelId: -1,
      message:
        'Esta seguro/a de regresar al menu principal, los cambios pendientes se perderan.',
      title: 'Salir',
      type: 'warning',
    });

    if (exitAnswer.response !== 0) {
      return;
    }

    this.$router.push('/');
  }
}
</script>
