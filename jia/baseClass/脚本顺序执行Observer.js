


/**
 * @author 家
 * @QQ 203118908
 * @目的 多个脚本按照顺序执行
 * @param {Array} scriptNames - 写脚本名字就行, 不用加后缀.js
 * @简介 通过监听脚本间广播来控制脚本顺序执行
 * @备注 看看思路就行, 我懒得改成通用的了
 */

let service = require('./service')
let config = require('./config')
function Observer (appName, scriptNames, callback) {
  if (!appName) {
    throw new Error('请添加appName')
  }
  if (!config.appNames[appName]) {
    throw new Error('请添加正确的appName')
  }
  if (!scriptNames || scriptNames.length < 1) {
    throw new Error('Observer (scriptNames) 参数为空')
  }
  callback = callback || (() => { alert('脚本执行完成') })

  // events.broadcast.removeAllListeners()
  this.ts = new Date().getTime()
  let that = this
  events.broadcast.on("脚本列表执行完成" + that.ts, function () {
    log('接收到广播 脚本列表执行完成' + that.ts)
    // engines.myEngine().forceStop()
    // events.broadcast.removeAllListeners()
    var len = that.listenerNameList.length
    for (var i = 0; i < len; i++) {
      let eventName = that.listenerNameList[i]
      events.broadcast.removeAllListeners(eventName)
    }
    callback()
  });
  events.broadcast.on("用户参数填写错误", function () {
    log('接收到广播 用户参数填写错误')
    var len = that.listenerNameList.length
    for (var i = 0; i < len; i++) {
      let eventName = that.listenerNameList[i]
      events.broadcast.removeAllListeners(eventName)
    }
    this.scriptNames = []
  });
  this.listenerNameList = ["脚本列表执行完成" + this.ts, '用户参数填写错误']
  this.scriptNames = scriptNames || []
  this.currentScriptContent = null;
  this.downloadFile = service.downloadFile
  this.addNotice = function (scriptName) {
    var scriptPath = files.join(files.getSdcardPath(), '.' + scriptName + '.js')
    let scriptUrl = config.脚本列表url前缀[config.appNames[appName]] + scriptName + '.js'
    log('url = ' + scriptUrl)
    log(scriptName + ' : 下载 开始')
    this.downloadFile(scriptPath, scriptUrl)
    log(scriptName + ' : 下载 结束')
    var scriptContent = files.read(scriptPath)
    let broadcastEmit = ";(function () {events.on(\"exit\", function () {  events.broadcast.emit(\"脚本执行完成" + this.ts + "\",\"" + scriptName + "\");    });})();;"
    // let prefix = 'module.exports=function(){;  ' + broadcastEmit + ' ;'
    let prefix = broadcastEmit + ' ;'
    // let suffix = '}'
    this.currentScriptContent = prefix + scriptContent;
    let newScriptPath = files.join(files.getSdcardPath(), '.' + scriptName + 'addNotice.js')
    files.write(newScriptPath, this.currentScriptContent);
    this.newScriptPath = newScriptPath
  }
  that.lastName = ''
  this.next = function () {
    if (that.scriptNames.length > 0) {
      var scriptName = this.scriptNames.shift()
      that.addNotice(scriptName)
      if (!that.lastName) {
        events.broadcast.on("脚本执行完成" + that.ts, function (name) {
          that.listenerNameList.push("脚本执行完成" + that.ts)
          log("脚本执行完成" + that.ts)
          if (name !== that.lastName) {
            that.lastName = name
            that.next()
          }
        });
      }
      engines.execScriptFile(that.newScriptPath, {
        path: files.join(files.getSdcardPath())
      })
    } else {
      events.broadcast.emit("脚本列表执行完成" + that.ts, JSON.stringify(that.scriptNames));
      that.listenerNameList.push("脚本执行完成" + that.ts)
      return true
    }
  }
}

module.exports = Observer

// var scriptNames = ['1', '2', '3'];
// (new Observer(scriptNames)).next();

// setInterval(function () { }, 1000)