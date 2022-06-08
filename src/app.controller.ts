import {
  All,
  Controller,
  // Get,
  // Param,
  // Post,
  // Query,
  // Redirect,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('appService', appService);
  }
  @All('login')
  async login(@Req() request: Request): Promise<any> {
    const body = {
      errcode: 400,
      errmsg: '参数有误',
    };
    if (!request.body.code) {
      return body;
    }
    const code = request.body.code;
    const tokenRes = await this.appService.getToken();
    return await this.appService.getUserInfo(tokenRes.access_token, code);
  }

  @All('getUserInfo')
  async getUserInfo(@Req() request: Request): Promise<any> {
    const params = request.query;
    const tokenRes = await this.appService.getToken();
    return await this.appService.getUserInfoByToken(
      tokenRes.access_token,
      params.userid,
    );
  }
}
