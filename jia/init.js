let lib = require('./lib/lib')
let config = require('./config')


module.exports = function (workConfig) {
  workConfig = workConfig || {}
  workConfig = Object.assign(config, workConfig);
  log('最终配置 = ' + JSON.stringify(config))
  if (workConfig.execAppName) {
    try {
      if (auto()) {
        log('无障碍服务已开启, 无需执行执行命令: 打开无障碍')
      } else {
        log('无障碍服务未开启, 执行命令: 打开无障碍')
        lib.打开指定app的无障碍(workConfig.execAppName);
        sleep(100)
      }
    } catch (e) {
      try {
        lib.关闭指定app的无障碍(workConfig.execAppName);
        sleep(100)
        lib.打开指定app的无障碍(workConfig.execAppName);
        sleep(100)
      } catch (e) {
        throw new Error('无障碍服务 打开异常')
      }
    }
  }

  lib.常驻通知();
  lib.设置窗口过滤器()
}