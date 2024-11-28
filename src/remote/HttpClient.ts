/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
  // tslint:disable-next-line: interface-name
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
    });
    this.initializeResponseInterceptor();
  }

  protected handleError = (error: any) => Promise.reject(error.response.data);

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );
  };

  private handleResponse = ({ data }: AxiosResponse) => data;
}
