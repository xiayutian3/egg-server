'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Project = app.model.define('project', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    addr: {
      type: STRING(20),
      unique: {
        args: true,
        msg: '项目地址不能重复',
      },
    },
    name: {
      type: STRING(30),
      unique: {
        args: true,
        msg: '项目名称不能重复',
      },
    },
    remark: STRING(200),
    createDate: DATE,
    updateDate: DATE,
  }, {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'updateDate',
  });
  return Project;
};
