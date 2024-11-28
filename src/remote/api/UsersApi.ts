/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import { API_URL } from '@/consts';
import { HttpClient } from '../HttpClient';

export default class UsersApi extends HttpClient {
  constructor() {
    super(API_URL + '/usuario_prod');
  }

  public validateUserInDB = (data: any) =>
    this.instance.post('/validateUser', data);
  public login = (data: any) => this.instance.post('/login', data);
}
