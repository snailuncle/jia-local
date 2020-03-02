let config = require('./config')
let lib = require('./lib')
let appName = config.appName
let appVersion = lib.getAppVersion(appName)
let app界面信息 = config.app界面信息
log('app界面信息 =')
log(app界面信息)

app界面信息 = app界面信息['版本号 ' + appVersion.replace(/\./g, '_')]
if (!app界面信息) {
  lib.toastAndAlert('没有该版本的app界面信息: ' + appVersion)
  lib.stopSelf()
} else {
  log('版本号正确')
}

let storage = config.storage
let 发过消息的用户名列表 = storage.get(config.storageKey.发过消息的用户名列表)
if (!发过消息的用户名列表) {
  storage.put(config.storageKey.发过消息的用户名列表, ['抖音小助手', '系统消息', '购物助手', '春节活动助手'])
}

var init = function () {
  // auto.setWindowFilter(function (window) { return true });
}
module.exports = init