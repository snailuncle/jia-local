

let appName = 'QQ'
var storage = storages.create(appName);
let app界面信息 = require('./app界面信息')

let config = {
  mode: "production",  // production development
  appName: appName,
  app界面信息: app界面信息,
  storage: storage,
  storageKey: {
    发过消息的用户名列表: '发过消息的用户名列表',
    当前发消息的用户名: '当前发消息的用户名',
  }
}

if (config.mode === "development") {
  config.话术所在文件 = files.join(files.getSdcardPath(), "脚本/comment.js");
  config.三句话时间间隔所在文件 = files.join(files.getSdcardPath(), "脚本/comment3IntervalTime.js");
  config.下个用户时间间隔所在文件 = files.join(files.getSdcardPath(), "脚本/nextUserIntervalTime.js");
} else if (config.mode === "production") {
  config.话术所在文件 = files.join(files.getSdcardPath(), "comment.txt");
  config.三句话时间间隔所在文件 = files.join(files.getSdcardPath(), "comment3IntervalTime.txt");
  config.下个用户时间间隔所在文件 = files.join(files.getSdcardPath(), "nextUserIntervalTime.txt");
}

module.exports = config