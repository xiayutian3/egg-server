'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {

  // 查询项目列表
  async index() {
    const { ctx } = this;
    // // 定义查询接口的请求参数规则
    // const searchRule = {
    //   pageSize: 'string',
    //   pageNum: 'string',
    // };

    // ctx.validate(searchRule, ctx.query);
    await ctx.service.projectService.getList(ctx.query);
  }

  // 创建项目
  async create() {
    const { ctx } = this;
    // 定义创建项目接口的请求参数规则
    const createRule = {
      name: 'string',
      remark: 'string',
      addr: 'string',
    };
    console.log(ctx.request.body);
    ctx.validate(createRule, ctx.request.body);
    await ctx.service.projectService.createProject(ctx.request.body);
  }

  // 编辑项目
  async update() {
    const { ctx } = this;
    // 定义创建项目接口的请求参数规则
    const createRule = {
      name: 'string',
      remark: 'string',
      id: 'number',
      addr: 'string',
    };
    ctx.validate(createRule, ctx.request.body);
    await ctx.service.projectService.updateProject(ctx.request.body);
  }

  // 删除项目
  async delete() {
    const { ctx } = this;
    // 定义创建项目接口的请求参数规则
    const createRule = {
      id: 'number',
    };
    ctx.validate(createRule, ctx.request.body);
    await ctx.service.projectService.deleteProject(ctx.request.body);
  }

}

module.exports = ProjectController;
