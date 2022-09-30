'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DataTypes } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: INTEGER,
    name: {
      type: STRING(30),
      defaultValue: '',
    },
    acount: STRING(200),
    password: STRING(50),
    createDate: {
      type: DATE,
      defaultValue: DataTypes.NOW,
    },
    updateDate: {
      type: DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'updateDate',
  });
  return User;
};
