/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
import { Component } from 'vue';

// tslint:disable-next-line: interface-name
export interface MenuOption {
  description: string;
  submenu?: MenuOption[];
  component?: Component | string;
  onLoad?: (() => void) | (() => Promise<void>);
  message?: string;
}

export type Menu = MenuOption[];
