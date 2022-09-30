'use strict';
/**
 * 递归执行配置对象中的函数表达式
 * obj 原始对象
 * nObj 新对象
 * ctx egg上下文对象
 */
const reg = /-url$/; // 自动添加协议头
const deepCloneExecuteFn = (obj, nObj, ctx) => {
  const newObj = nObj || {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[key] = (obj[key].constructor === Array) ? [] : {};
      deepCloneExecuteFn(obj[key], newObj[key], ctx);
    } else if (typeof obj[key] === 'function') {
      newObj[key] = obj[key](ctx);
    } else {
      // console.log('obj[key]', key, obj[key]);
      if (reg.test(key)) {
        // console.log(key);
        newObj[key] = `${ctx.request.protocol}://${obj[key]}`;
      } else {
        newObj[key] = obj[key];
      }

    }
  }
  return newObj;
};
module.exports = { deepCloneExecuteFn };
