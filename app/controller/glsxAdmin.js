/* eslint-disable no-eval */
'use strict';

const Controller = require('egg').Controller;
const utils = require('../../utils/index');

class GlsxAdminController extends Controller {
  async logical(ctx, envObjId) {
    // 请求req
    const originRequest = ctx.request;
    // eslint-disable-next-line no-debugger
    // debugger;
    const moduleUrl = originRequest.query.moduleUrl || 'base';
    // 获取域名
    // const originUrl = ctx.request.header.host;
    const originUrl = ctx.request.header.origin ? ctx.request.header.origin.split('//')[1].split(':')[0] : ctx.request.ip;
    console.log('originUrl: ', originUrl, ctx.request.protocol);
    // originRequest.header.origin = originUrl;
    // ctx._req = originRequest;

    // 生产production判断
    const productionCondition = await ctx.service.conditionService.getList({
      id: envObjId,
    });
    const productionContent = productionCondition.rows[0].dataValues.content;
    // 数组（prodution）或者对象(test、develop 其他环境)的情况 ['123'],  {a:123}
    const productionResultObj = eval('(' + productionContent + ')');
    // console.log('productionResultObj: ', productionResultObj);
    // 读取相应的环境配置，相应的模块
    let res;
    let data;
    if (envObjId === 1) {
      if (productionResultObj.includes(originUrl)) {
        data = await ctx.service.projectApiService.findOne({
          projectId: envObjId,
          url: moduleUrl,
        });
      }
    } else {
      if (Object.keys(productionResultObj).includes(originUrl)) {
        // 对应的环境名称 比如 test
        const env = productionResultObj[originUrl];
        data = await ctx.service.projectApiService.findOne({
          baseUrl: env,
          url: moduleUrl,
        });
      }
    }
    if (data) {
      res = eval('(' + data.content + ')');
      data = {
        ...data.dataValues,
        content: utils.deepCloneExecuteFn(res, {}, ctx),
      };
      this.success('获取成功', data.content);
      return true;
    }
    this.notFound();
    return false;
  }
  // 查询
  async index() {
    const { ctx } = this;
    const res1 = await this.logical(ctx, 1);
    if (!res1) {
      const res2 = await this.logical(ctx, 2);
      if (!res2) {
        // 如果都没有
        ctx.body = {
          code: 200,
          data: '',
          message: '不存在该环境配置',
        };
      }
    }
  }
  success(msg, data) {
    this.ctx.body = {
      code: 200,
      message: msg || '请求成功',
      data: data || null,
    };
  }

  notFound(msg, data) {
    this.ctx.body = {
      code: '-1',
      message: msg || 'not Found',
      data: data || null,
    };
  }
}

module.exports = GlsxAdminController;
