/* eslint-disable quotes */
// eslint-disable-next-line strict
const Service = require("egg").Service;

class BaseService extends Service {
  async findAll(where) {
    return await this.app.model[this.entity].findAll({ where });
  }

  // 查询一条
  async findOne(where) {
    return await this.app.model[this.entity].findOne({ where });
  }

  // 创建
  async create(data) {
    return await this.app.model[this.entity].create(data);
  }

  // 修改
  async update(data) {
    const { id, ...where } = data;
    return await this.app.model[this.entity].update(where, {
      where: { id },
    });
  }

  // 删除
  async destroy(id) {
    return await this.app.model[this.entity].destroy({ where: { id } });
  }
}

module.exports = BaseService;
