<template>
  <div
    class="flex flex-col self-center justify-center h-screen w-full fixed z-10"
  >
    <div class="flex flex-row justify-center select-none">
      <img
        class="loader cursor-wait"
        src="@/assets/img/andrea_logo_green.svg"
      />
    </div>
    <div class="flex flex-row justify-center select-none">
      <h4 class="text-center font-bold loader-text cursor-wait">CARGANDO...</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Loader',
})
export default class Loader extends Vue {}
</script>
<style scoped>
.loader {
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

.loader-text {
  animation: blink 2s infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>
