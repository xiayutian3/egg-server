/* eslint-disable quotes */
// eslint-disable-next-line strict
const Service = require('egg').Service;
class ProjectService extends Service {
  // 查找项目列表
  async getList() {
    const { ctx, app } = this;
    // const pageSize = params.pageSize;
    // const num = params.pageNum;
    // const list = await this.app.mysql.select('project', {
    //     orders: [['id', 'desc']], // 排序方式
    //     limit: parseInt(pageSize),
    //     offset: (num - 1) * pageSize
    // })
    // const list = await app.model.Project.findAndCountAll({
    //     offset: (num - 1) * pageSize,
    //     limit: parseInt(pageSize)
    // })
    // console.log(ctx.state)

    const list = await app.model.Project.findAndCountAll();


    ctx.body = {
      code: 200,
      data: list,
      message: '',
    };
  }

  // 创建项目
  async createProject(params) {
    const { ctx, app } = this;
    const pass = await app.model.Project.findOne({ where: { name: params.name } });
    if (pass) {
      ctx.body = {
        code: -1,
        message: '存在相同的项目名称',
        data: '',
      };
      return false;
    }
    const result = await app.model.Project.create({ name: params.name, addr: params.addr, remark: params.remark });
    if (result) {
      ctx.body = {
        code: 200,
        message: '新增成功',
        data: result,
      };
    } else {
      ctx.body = {
        code: -1,
        message: '新增失败',
        data: '',
      };
    }
  }

  // 更新项目
  async updateProject(params) {
    const { ctx, app } = this;
    const ider = await app.model.Project.findOne({ where: { id: params.id } });
    if (!ider) {
      ctx.body = {
        code: -1,
        message: '项目不存在',
        data: '',
      };
      return false;
    }
    const result = await app.model.Project.update({ name: params.name, addr: params.addr, remark: params.remark }, {
      where: { id: params.id },
    });
    ctx.body = {
      code: 200,
      message: '更新成功',
      data: result[0],
    };
  }

  // 删除项目
  async deleteProject(params) {
    const { ctx, app } = this;
    const result = await app.model.Project.destroy({ where: { id: params.id } });
    if (!result) {
      ctx.body = {
        code: -1,
        message: '项目不存在',
        data: result,
      };
      return;
    }
    ctx.body = {
      code: 200,
      message: '更新成功',
      data: result,
    };
  }
}

module.exports = ProjectService;
