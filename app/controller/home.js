'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.app.mysql)
    const mm = await this.app.mysql.query('select * from project where id = ?', 1);
    console.log(mm)
    let result = {}
    result.code = 200;
    result.data = mm;
    ctx.body = result;
  }
}

module.exports = HomeController;
