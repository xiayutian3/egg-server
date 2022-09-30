'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.tokenHandler(app.config.jwt);

  // 动态生成配置路由

  app.model.ProjectApi.findAll().then(res => {
    res.forEach(item => {
      let { baseUrl, url, method } = item;
      baseUrl = '/' + baseUrl;
      url = '/' + url;
      router[method](baseUrl + url, controller.projectApi.findApiDetail);
    });
  });

  router.get('/redirctProject', jwt, controller.home.index);

  router.get('/projectApi/list', jwt, controller.projectApi.findAllApi);
  router.post('/projectApi/add', jwt, controller.projectApi.createApi);
  router.post('/projectApi/edit', jwt, controller.projectApi.changeApi);
  router.post('/projectApi/delete', jwt, controller.projectApi.deleteApi);

  router.post('/login', controller.login.login);
  router.post('/register', controller.login.register);
  router.post('/delUser', jwt, controller.login.logout);
  router.post('/updateUserInfo', jwt, controller.login.update);

  router.get('/project/list', jwt, controller.project.index);
  router.post('/project/add', jwt, controller.project.create);
  router.post('/project/edit', jwt, controller.project.update);
  router.post('/project/delete', jwt, controller.project.delete);

  // 根据域名条件判断逻辑
  router.get('/condition/list', jwt, controller.condition.index);
  router.post('/condition/edit', jwt, controller.condition.update);

  // 生产、test、develop读取配置的接口
  router.get('/glsxAdmin/config', controller.glsxAdmin.index);
};
