import axiosRaw, { Axios, AxiosHeaders } from 'axios';
import https from 'https';

export class SS {
  private ax: Axios;

  constructor(token: string) {
    this.ax = axiosRaw.create({
      baseURL: 'https://smart-stonks.zerouptime.ru/api/rpc/',
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    this.ax.interceptors.request.use(function (config) {
      if (!config.headers) config.headers = {} as AxiosHeaders;
      config.headers.Authorization = token;
      config.headers['anti-csrf'] = Math.random().toFixed(66).slice(2);
      return config;
    });
  }

  async getPublicStats() {
    return await this.query('getPublicStats', () => 1 as any);
  }

  // async getBotsPublicData() {
  //   return await this.query('getBotsPublicData', () => 1 as any);
  // }

  // //ss-sdk
  // async getExtCurrentUser({ pass, email, password }, ctx: Ctx) {
  //   return await this.query('getExtCurrentUser', async () =>
  //     getExtCurrentUser({ pass, email, password }, ctx)
  //   );
  // }

  private async query<T>(route: string, resolver: (...inp: any) => Promise<T>) {
    return this.ax
      .post(route, { params: {} })
      .then((r) => {
        let res = r.data as RpcResponse<T>;
        if (res.error) throw res.error;
        return res.result;
      })
      .catch((e) => {
        console.log('ERROR', e.toString());
        throw e.toString();
      });
  }
}

type RpcResponse<T> = {
  result: T;
  error: null | string;
  meta: any;
};
