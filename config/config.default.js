/* eslint valid-jsdoc: "off" */

'use strict';

const { mysql } = require('../config/confg.dev');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
let isProd;
if (process.env.NODE_ENV === 'development') {
  isProd = false;
} else {
  isProd = true;
}
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  // config.keys = appInfo.name + '_1646015306357_8919';

  // add your middleware config here
  // config.middleware = ["tokenHandler", "errorHandler"];
  config.middleware = [ 'errorHandler' ];

  // // 中间件执行匹配开启
  // config.tokenHandler = {
  //   match(ctx) { // 只匹配指定路由，反之如果只忽略指定路由，可以用ignore
  //     //匹配不需要验证token的路由
  //     const url = ctx.request.url;
  //     if (url.startsWith("/login") || url.startsWith("/register")) {
  //       // ctx.logger.info('config.tokenHandler:','关闭token验证')
  //       return false;
  //     } else {
  //       // ctx.logger.info('config.tokenHandler:','开启token验证')
  //       return true; // 开启中间件，开启token验证
  //     }
  //   }
  // };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // config.mysql = mysql;
  let databaseInfo;
  if (isProd) {
    databaseInfo = {
      host: 'supplychain.db.glsx.com',
      port: 13306,
      username: 'biz_config_center',
      password: 'bO3OQvHJ',
    };
  } else {
    databaseInfo = {
      host: '192.168.3.190', // test环境
      port: 3306,
      username: 'dev_user',
      password: 'df234fl',
    };
  }
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    timezone: '+08:00',
    database: 'config_center',
    ...databaseInfo,

    define: {
      underscored: false,
      freezeTableName: true,
      timestamps: false,
    },
  };


  // 登录鉴权
  config.jwt = {
    secret: 'glsx-config-center',
  };

  // 错误监听
  // config.onerror = {
  //   html(err, ctx) {
  //     // html hander
  //     ctx.body = { message: err.message, code: '401', data: '' };
  //     //ctx.status = 401;
  //   },
  //   json(err, ctx) {
  //     //ctx.body = { message: err };
  //     ctx.body = { message: err.message, code: '402', data: '' };
  //     //ctx.status = 402;
  //   },
  //   jsonp(err, ctx) {
  //     // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
  //   },
  // }
  // ip访问
  config.cluster = {
    listen: {
      // path: '',
      // port: 7001,
      hostname: '0.0.0.0',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
