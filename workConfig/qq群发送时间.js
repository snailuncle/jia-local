
let service = require('../service')
let config = require('../config')

module.exports = {
  打开qq群: {
    name: '打开qq群',
    limitTime: 5000,
    action: function () {
      toast("打开qq群")
      service.打开qq群()
    },
  },
  输入消息: {
    name: '输入消息',
    limitTime: 5000,
    action: function () {
      toast("输入消息")
      service.输入消息()
    },
  },
  点击发消息: {
    name: '点击发消息',
    limitTime: 5000,
    action: function () {
      toast("点击发消息")
      service.点击发消息()
    },
  },
  发送消息: {
    name: '发送消息',
    limitTime: 5000,
    action: function () {
      toast("发送消息")
      service.发送消息()
    },
  },
}
