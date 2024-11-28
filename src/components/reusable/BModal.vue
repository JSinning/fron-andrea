<template>
  <div
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
  >
    <div class="relative mx-auto w-auto max-w-2xl">
      <div class="bg-white w-full rounded shadow-2xl flex flex-col">
        <div
          class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="text-lg">{{ prompt }}</strong>
          <div class="content-center mt-2">
            <div class="flex flex-row flex-wrap">
              <button
                class="btn-succes rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                @click="$emit('on-yes')"
              >
                Si
              </button>
              <button
                class="btn-danger rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                @click="$emit('on-no')"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'BModal',
})
export default class BModal extends Vue {
  @Prop(String) public readonly prompt: string;
}
</script>
