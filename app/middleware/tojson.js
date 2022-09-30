// 鉴权中间件
module.exports = (options) => {
    return async function (ctx, next) {
        if (!options) {
            ctx.status = 401;
            ctx.body = {
                message: '没有token',
            };
            return
        }
        ctx.status = options.status
        ctx.body = {
            code: options.code || 200,
            data: options.data,
            message: options.message
        }
        await next();
    };
};
