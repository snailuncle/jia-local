let init = require('./init')
let service = require('./service')
init()
let controller = {
  run () {
    let workList = ['打开qq群', '点击发消息', '输入消息', '发送消息']
    // let workList = ['点击一个没有发送过消息的用户']
    let flow = service.createFlow('qq群发送时间')
    flow.setWorkList(workList)
    flow.run()
  }
}

module.exports = controller