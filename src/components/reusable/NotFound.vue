<!--
  */
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 /*
 -->
<template>
  <div class="flex flex-col justify-center items-center -mt-10">
    <div class="flex flex-row pt-2 justify-center">
      <img class="flex w-4/5 h-full" src="@/assets/img/robot_404.svg" />
    </div>
    <div class="flex flex-row justify-center -mt-10">
      <h2 class="text-4xl text-andrea uppercase text-center font-bold">
        {{ message }}
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'NotFound',
})
export default class NotFound extends Vue {
  @Prop(String) public message: string | undefined;
}
</script>
