/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
export const greet = () => {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 0 && hour < 12) {
    return 'Buenos Días,';
  }

  if (hour >= 12 && hour < 18) {
    return 'Buenas tardes,';
  }

  if (hour >= 18 && hour < 24) {
    return 'Buenas noches,';
  }
};
