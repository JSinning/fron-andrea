/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
import { BaseResponse } from '@/types';

export async function handle<T>(
  promise: Promise<T>,
): Promise<[T, BaseResponse]> {
  try {
    const data = await promise;
    return [data, undefined];
  } catch (err) {
    return Promise.resolve([undefined, err as BaseResponse]);
  }
}
