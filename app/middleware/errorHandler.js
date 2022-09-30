'use strict';

module.exports = (options, app) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 生成环境不返回具体错误
      if (app.config.env !== 'prod') {
        ctx.body = {
          code: err.status || -1,
          message: '系统异常',
          data: err,
        };
      } else {
        ctx.body = {
          code: err.status || -1,
          message: err.message || '系统异常，请联系管理员！',
          data: null,
        };
      }
    }
  };
};
