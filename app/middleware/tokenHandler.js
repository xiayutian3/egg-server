// 鉴权中间件
module.exports = options => {
  return async function(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode = '';
    if (token) {
      const atoken = token.split(' ')[1];
      try {
        // 解码token
        decode = await ctx.app.jwt.verify(atoken, options.secret);// 验证token
        console.log(options.secret, '---------');
        // 获取用户信息
        ctx.decode = decode;
        ctx.state.user = decode;
        console.log(next);
        // 切记先解析token并存储数据后再执行回调，否则解析数据获取不到x
        await next();
      } catch (error) {
        // /ctx.status = 200;
        ctx.body = {
          code: '401',
          message: '登录失效',
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: '没有token',
      };
      return;
    }
  };
};
