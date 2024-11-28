<template>
  <div class="profile">
    <div class="flex flex-row m-2">
      <img
        class="h-8 w-8 rounded-full mt-2 ml-2"
        src="@/assets/img/profile.svg"
      />
      <div class="flex flex-col w-full">
        <span class="text-white text-xs font-semibold ml-2 mt-1"
          >{{ greet }}
        </span>
        <span class="text-white text-xs font-semibold ml-2"
          >{{ this.$store.getters.getUsuario }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { greet } from '@/utils/greet';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'User',
})
export default class User extends Vue {
  public greet = greet();
}
</script>
