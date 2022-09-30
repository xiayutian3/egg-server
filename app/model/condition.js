'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Condition = app.model.define('condition', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    content: STRING(255),
    createDate: DATE,
    updateDate: DATE,
  }, {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'updateDate',
  });
  return Condition;
};
