let { JInit, JFlow, JWork, JConfig } = require('./jia/main')
let flowConfig = require('./flowConfig')
let config = require('./config')
let lib = require('./lib')
let appVersion = lib.getAppVersion(config.appName)
let packageName = getPackageName(config.appName);
let app界面信息 = config.app界面信息['版本号 ' + appVersion.replace(/\./g, '_')]

let storage = config.storage

var 求差集 = function (a, b) {
  return a.filter(function (v) { return !(b.indexOf(v) > -1) })
}
function getTime (time, rule) {
  var rule = rule || "yyyy-MM-dd HH:mm:ss";
  if (time) {
    return new java.text.SimpleDateFormat(rule).format(new Date(time));
  } else {
    return new java.text.SimpleDateFormat(rule).format(new Date());
  }
}
var 打开qq群 = function () {
  app.startActivity({
    action: "android.intent.action.VIEW",
    data: "mqqapi://card/show_pslcard?card_type=group&uin=" + 586823180,
    packageName: "com.tencent.mobileqq",
  });

}
var 点击发消息 = function () {
  let view = text('发消息').visibleToUser(true).findOne()
  view.click()
}
var 输入消息 = function () {
  let content = getTime()
  let view = id(app界面信息.q群聊天页_底部_输入框_id).visibleToUser(true).findOne()
  view.setText(content)
  sleep(500)
}
var 发送消息 = function () {
  let view = text('发送').visibleToUser(true).findOne()
  view.click()
}
module.exports = {
  createFlow (flowName) {
    if (!flowConfig.flow[flowName]) {
      throw new Error('flowConfig中没有该属性: ' + flowName)
    }
    let workConfig = flowConfig.flow[flowName].importConfiguration()
    workConfig = Object.assign(config, workConfig);
    // throw new Error('请传入 name, workList, workConfig 三个参数, 类型分别为,': 字符串, 数组, 对象')
    let workList = flowConfig.flow[flowName].workList
    let flow = new JFlow(flowName, workList, workConfig)
    return flow
  },
  toastAndAlert (msg) {
    lib.toastAndAlert(msg)
  },
  stopSelf () {
    lib.stopSelf()
  },
  打开qq群: 打开qq群,
  点击发消息: 点击发消息,
  输入消息: 输入消息,
  发送消息: 发送消息,
}