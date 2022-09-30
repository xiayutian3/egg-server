'use strict';
const Controller = require('egg').Controller;

class ProjectController extends Controller {
  async findAllApi() {
    const { ctx } = this;
    const projectId = ctx.query.projectId;
    const data = await ctx.service.projectApiService.findAll({ projectId });
    this.success('请求成功', data);
  }

  async findApiDetail() {
    const { ctx } = this;
    const urlList = ctx.request.url.split('/');
    const baseUrl = urlList[urlList.length - 2];
    const url = urlList[urlList.length - 1];
    const data = await ctx.service.projectApiService.findOne({ url, baseUrl });
    if (data) {
      this.success('获取成功', data);
    } else {
      this.notFound();
    }
  }

  async deleteApi() {
    const { ctx } = this;
    const createRule = {
      id: { type: 'number', require: true },
    };
    ctx.validate(createRule, ctx.request.body);
    const { id } = ctx.request.body;
    const apiItem = await ctx.service.projectApiService.findOne({ id });
    const { method, baseUrl, url } = apiItem.dataValues;
    const targetApi = await ctx.service.projectApiService.destroy(id);
    // eslint-disable-next-line eqeqeq
    if (targetApi == 1) {
      //   let index = this.ctx.app.router.stack.findIndex((item) => {
      //     return item.path === baseUrl + url && item.methods.includes(method);
      //   });
      //   this.ctx.app.router.stack.splice(index, 1);
      this.delRouter(baseUrl, url, method);
      this.success('删除成功');
    } else {
      this.notFound('删除失败');
    }
  }

  async changeApi() {
    const { ctx } = this;
    const createRule = {
      id: { type: 'number', require: true },
      method: { type: 'string', require: true },
      url: { type: 'string', require: true },
      baseUrl: { type: 'string', require: true },
    };
    ctx.validate(createRule, ctx.request.body);
    const res = await ctx.service.projectApiService.findOne({
      // url: ctx.request.body.url,
      // baseUrl: ctx.request.body.baseUrl,
      // method: ctx.request.body.method,
      id: ctx.request.body.id,
    });
    if (!res) {
      // return this.notFound('API已存在');
      ctx.body = {
        code: -1,
        message: 'API不存在',
        data: '',
      };
      return false;
    }
    const { id } = ctx.request.body;
    const data = await ctx.service.projectApiService.update(ctx.request.body);
    if (data && data[0]) {
      const apiItem = await ctx.service.projectApiService.findOne({ id });
      const { method, baseUrl, url } = apiItem.dataValues;
      this.delRouter(baseUrl, url, method);
      this.createRouter(
        ctx.request.body.baseUrl,
        ctx.request.body.url,
        ctx.request.body.method
      );
      this.success('修改成功');
    } else {
      this.notFound('修改失败');
    }
  }

  async createApi() {
    const { ctx } = this;
    const createRule = {
      method: { type: 'string', require: true },
      url: { type: 'string', require: true },
      baseUrl: { type: 'string', require: true },
      remark: { type: 'string', require: true },
      content: { type: 'string' },
    };
    ctx.validate(createRule, ctx.request.body);
    const res = await ctx.service.projectApiService.findOne({
      url: ctx.request.body.url,
      baseUrl: ctx.request.body.baseUrl,
      method: ctx.request.body.method,
    });
    if (res) {
      return this.notFound('API已存在');
    }
    const data = await ctx.service.projectApiService.create({
      ...ctx.request.body,
    });
    if (data && data.dataValues) {
      let { method, url, baseUrl } = data.dataValues;
      method = method.toLowerCase();
      this.createRouter(baseUrl, url, method);
      this.success('创建成功');
    }
  }

  delRouter(baseUrl, url, method) {
    baseUrl = '/' + baseUrl;
    url = '/' + url;
    const index = this.ctx.app.router.stack.findIndex(item => {
      return item.path === baseUrl + url && item.methods.includes(method);
    });
    this.ctx.app.router.stack.splice(index, 1);
  }

  createRouter(baseUrl, url, method) {
    baseUrl = '/' + baseUrl;
    url = '/' + url;
    this.ctx.app.router[method](
      baseUrl + url,
      this.ctx.app.controller.projectApi.findApiDetail
    );
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

module.exports = ProjectController;
