import axios from 'axios';
import config from '../config/ding.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getUserInfo(accessToken: string, code: string): Promise<any> {
    // 发送 POST 请求
    const result = await axios({
      method: 'post',
      url:
        'https://oapi.dingtalk.com/topapi/v2/user/getuserinfo?access_token=' +
        accessToken,
      data: {
        code: code,
      },
    });
    return result.data;
  }
  async getToken(): Promise<any> {
    const result = await axios({
      method: 'get',
      url: `https://oapi.dingtalk.com/gettoken?appkey=${config.appkey}&appsecret=${config.appsecret}`,
    });
    return result.data;
  }
  async getUserInfoByToken(accessToken: string, userid: any): Promise<any> {
    const result = await axios({
      method: 'post',
      url: `https://oapi.dingtalk.com/topapi/v2/user/get?access_token=${accessToken}`,
      data: {
        userid: userid,
      },
    });
    return result.data;
  }
}
