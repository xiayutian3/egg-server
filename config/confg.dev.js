exports.mysql = {
    // 单数据库信息配置
    client: {
        // host
        host: '192.168.3.190',
        // 端口号
        port: '3306',
        // 用户名
        user: 'dev_user',
        // 密码
        password: 'df234fl',
        // 数据库名
        database: 'config_center',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
};