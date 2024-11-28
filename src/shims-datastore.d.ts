/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import DBClient from './localdb/DBClient';
import { SerialComClient } from './classes/SerialComClient';

declare module 'vue/types/vue' {
  export interface Vue {
    $local: DBClient;
    $authToken: string;
    $serial: SerialComClient;
  }
}
