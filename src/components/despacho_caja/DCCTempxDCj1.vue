<!-- */ Copyright (©) Andrea.com.co - All Rights Reserved * Unauthorized copying
of this file, via any medium is strictly prohibited. * Proprietary and
confidential. * Written and developed with ❤️ by Andrea.com.co * 2020 /* -->
<template>
  <div class="w-full flex flex-col gap-0">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox
        :output="output.message"
        :isError="output.isError"
        @empty="output.message = ''"
      />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <div class="card-table">
      <table class="table-fixed w-full text-xs">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th>Despacho Caja No</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500">
            <td>
              <PaginatedSelect />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :currentPagination="pagination"
        :currentDataLength="0"
        @click="() => {}"
      >
        Cargar más
      </ButtonPagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import IPagination from '@/types/IPagination';
import ButtonPagination from '../reusable/ButtonPagination.vue';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'DCCTempxDCj1',
})
export default class DCCTempxDCj1 extends Vue {
  // TODO: review to form original about functionality @Andre Melendez Or JUAN CASTAÑO
  @Prop(Boolean) public readonly: boolean;
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };

  private output = {
    isError: false,
    message: '',
  };
}
</script>
