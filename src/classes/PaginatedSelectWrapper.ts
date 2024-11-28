/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import IPagination from '@/types/IPagination';
import { Model, Vue, Emit, Component, Prop } from 'vue-property-decorator';

@Component
export default class PaginatedSelectWrapper extends Vue {
  @Model('change') public value!: string | number;
  @Prop({ default: false }) public isDisabled: boolean;

  public pagination: IPagination = {
    limit: 10,
    skip: 0,
  };

  public isFirstPage = true;

  public hasMorePages = true;

  public items: IInterfaceSelect[] = [];

  @Emit('change')
  public change(v: IInterfaceSelect['id']) {
    return v;
  }

  public async prev(cb: () => Promise<void>) {
    if (this.pagination.skip <= 0) {
      this.isFirstPage = true;
      return;
    }
    this.hasMorePages = true;
    this.pagination.skip = this.pagination.skip - this.pagination.limit;
    await cb();
    this.$forceUpdate();
  }

  public async next(cb: () => Promise<void>) {
    this.isFirstPage = false;
    this.pagination.skip = this.pagination.skip + this.pagination.limit;
    await cb();
    this.$forceUpdate();
  }
}
