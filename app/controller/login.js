'use strict';
const crypto = require('crypto');
const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 登录
  async login() {
    const { ctx } = this;
    const createRule = {
      acount: { type: 'string', require: true },
      password: { type: 'string', require: true },
    };
    ctx.validate(createRule, ctx.request.body);
    const { acount, password } = ctx.request.body;
    const hashPassword = crypto.createHash('md5').update(password).digest('hex');
    const userAccount = await ctx.service.loginService.findOne({
      acount,
    });
    if (!userAccount) {
      return this.notFoundAccount('无此账号');
    }
    const user = await ctx.service.loginService.findOne({
      acount,
      password: hashPassword,
    });
    if (!user) {
      return this.notFound('账号或密码错误');
    }
    // 创建token
    const token = this.app.jwt.sign(
      {
        name: acount,
      },
      this.app.config.jwt.secret,
      { expiresIn: 180000000 }
    );
    const obj = { ...user.dataValues };
    delete obj.password;
    const oParams = {
      user: obj,
      token,
    };
    this.success('登录成功', oParams);
  }

  // 注册
  async register() {
    const { ctx } = this;
    const createRule = {
      acount: { type: 'string', require: true },
      password: { type: 'string', require: true },
    };
    ctx.validate(createRule, ctx.request.body);
    const { acount, password } = ctx.request.body;
    const user = await ctx.service.loginService.findOne({ acount });
    if (user) {
      return this.notFound('该用户名已存在');
    }
    const hashPassword = crypto.createHash('md5').update(password).digest('hex');
    const data = await ctx.service.loginService.create({
      ...ctx.request.body,
      password: hashPassword,
    });
    if (data && data.dataValues) {
      this.success('注册成功', { acount });
    }
  }

  async update() {
    const { ctx } = this;
    const createRule = {
      id: { type: 'number', require: true },
    };
    // const { password, oldPassword, id } = ctx.request.body;
    const password = ctx.request.body.password || undefined;
    const oldPassword = ctx.request.body.oldPassword || undefined;
    const id = ctx.request.body.id;
    ctx.validate(createRule, ctx.request.body);
    const hashPassword = password && crypto.createHash('md5').update(password).digest('hex');
    const oldHashPassword = oldPassword && crypto.createHash('md5').update(oldPassword).digest('hex');
    const hasPassword = oldHashPassword && await ctx.service.loginService.findOne({ id, password: oldHashPassword });
    if (password && !hasPassword) {
      return this.notFound('原密码错误');
    }
    const data = await ctx.service.loginService.update({
      ...ctx.request.body,
      password: hashPassword || undefined,
    });
    if (data && data[0]) {
      this.success('修改成功');
    } else {
      this.notFound('修改失败');
    }
  }

  // 删除用户
  async logout() {
    const { ctx } = this;
    const createRule = {
      id: { type: 'number', require: true },
    };
    ctx.validate(createRule, ctx.request.body);
    const { id } = ctx.request.body;
    const user = await ctx.service.loginService.destroy(id);
    if (user === 1) {
      this.success('注销用户成功');
    } else {
      this.notFound('注销失败，用户不存在');
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

  notFoundAccount(msg, data) {
    this.ctx.body = {
      code: 404,
      message: msg || 'not Fund',
      data: data || null,
    };
  }
}

module.exports = LoginController;
