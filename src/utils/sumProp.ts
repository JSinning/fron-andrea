/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
export const sumProp = <T>(arr: T[], prop: keyof T) =>
  arr.reduce((previous, current) => previous + Number(current[prop]), 0);
