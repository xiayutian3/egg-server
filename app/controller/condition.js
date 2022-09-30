'use strict';

const Controller = require('egg').Controller;

class ConditionController extends Controller {
  // 查询
  async index() {
    const { ctx } = this;
    const params = {};
    const list = await ctx.service.conditionService.getList(params);
    ctx.body = {
      code: 200,
      data: list,
      message: '',
    };
  }


  // 编辑
  async update() {
    const { ctx } = this;
    // 定义创建项目接口的请求参数规则
    const createRule = {
      id: 'number',
      name: 'string',
      content: 'string',
    };
    ctx.validate(createRule, ctx.request.body);

    const result = await ctx.service.conditionService.updateCondition(ctx.request.body);
    if (!result || !result[0]) {
      ctx.body = {
        code: -1,
        message: '配置不存在',
        data: '',
      };
      return false;
    }
    ctx.body = {
      code: 200,
      message: '更新成功',
      data: result[0],
    };
  }

}

module.exports = ConditionController;
