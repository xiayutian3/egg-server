'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 跨域配置
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  // 登录鉴权
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  // 数据格式校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  // egg-sequelize
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};
