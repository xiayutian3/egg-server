'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DataTypes } = app.Sequelize;

  const ProjectApi = app.model.define('project_api', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    projectId: {
      type: INTEGER,
      primaryKey: true,
    },
    method: STRING(10),
    url: {
      type: STRING(127),
    },
    baseUrl: STRING(20),
    remark: {
      type: STRING(255),
    },
    content: {
      type: DataTypes.TEXT('long'),
    },
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
  // ProjectApi.associate = function () {
  //   app.model.ProjectApi.hasMany(app.model.Project, {
  //     foreignKey: "baseUrl",
  //     targetKey: "addr",
  //   });
  // };
  return ProjectApi;
};
