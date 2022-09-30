/* eslint-disable quotes */
// eslint-disable-next-line strict
const Service = require('egg').Service;
class ConditionService extends Service {
  // 查找项目列表
  async getList(params) {
    const { app } = this;
    const list = await app.model.Condition.findAndCountAll({ where: params });
    return list;
  }


  // 更新项目
  async updateCondition(params) {
    const { app } = this;
    const result = await app.model.Condition.update({ name: params.name, content: params.content }, {
      where: { id: params.id },
    });
    return result;
  }
}

module.exports = ConditionService;
