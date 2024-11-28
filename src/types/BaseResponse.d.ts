/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
export interface BaseResponse<T = null> {
  name: string;
  version: string;
  description: string;
  endpoint: string;
  message: string;
  statusCode: number;
  data?: T;
}
