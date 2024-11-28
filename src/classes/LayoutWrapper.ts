/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
import { Emit, Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class LayoutWrapper extends Vue {
  @Prop() public readonly signal: (this: this) => void;

  @Emit()
  public alert(message: string, isError: boolean = false) {
    return {
      isError,
      output: message,
    };
  }

  @Emit('reload')
  public reload(signal?: (this: this) => void) {
    return signal;
  }

  @Emit('show-loading')
  public showLoading(l: boolean) {
    return l;
  }
}
