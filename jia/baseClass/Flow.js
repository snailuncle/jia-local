
let Work = require('./Work')
let lib = require('../lib/lib')

/**
 * 职责1: 设置整体流程
 * 职责2: 加载默认配置
 */
// 定义工作流程类

function Flow (name, workList, workConfig) {

  if (!name || !workList || !workConfig) {
    throw new Error('请传入 name, workList, workConfig 三个参数, 类型分别为: 字符串, 数组, 对象')
  }
  this.name = name
  this.workList = workList
  this.workConfig = workConfig
  this.store = {}
  var len = this.workList.length
  for (var i = 0; i < len; i++) {
    let workName = this.workList[i]

    if (!this.workConfig[workName]) {
      log('workConfig中没有该工作配置: ' + workName)
      log('当前workConfig = ')
      log(this.workConfig)
      throw new Error('请对工作进行配置: ' + workName)

    }
  }
}
Flow.prototype.setWorkList = function (workList) {
  this.workList = workList
}

Flow.prototype.run = function () {
  log('当前工作流程名字: ' + this.name + ': 执行 开始')
  this.startTime = new Date().getTime()
  this.workListSummary = []
  this.workListSuccessful = []
  let len = this.workList.length
  for (let i = 0; i < len; i++) {
    this.workListSummary.push(this.workList[i])
  }
  log('当前工作流程列表: ' + this.workListSummary.join(' --> '))
  for (let i = 0; i < len; i++) {
    let workName = this.workList[i]
    if (!this.workConfig[workName]) {
      throw new Error('请在workConfig中对该工作: [' + workName + '] 进行配置')
    }
    let work = new Work(this.workConfig[workName])
    work.flow = this
    let workResult = false;
    for (let j = 0; j < work.workConfig.retryCount; j++) {
      log('当前工作名字: ' + work.name + ': 第' + j + '次 执行 开始 ')
      let startTime = new Date().getTime()
      let endTime;
      let spendTime = 0;
      let that = this;
      let workThreadId = threads.start(
        function () {
          // try {
          work.run()
          // } catch (e) {
          //   log('当前工作名字: ' + workName + ', 发生异常:')
          //   log(e)
          //   if (e.message.indexOf('无障碍服务') > -1) {
          //     log('是无障碍异常')
          //     lib.关闭指定app的无障碍(work.workConfig.execAppName);
          //     sleep(100)
          //     lib.打开指定app的无障碍(work.workConfig.execAppName);
          //     sleep(100)
          //   } else {
          //     log('不是无障碍异常')
          //     log(e.stack)
          //   }
          // }
          endTime = new Date().getTime()
        }
      )
      while (spendTime < work.limitTime) {
        workResult = work.getResult()
        if (workResult) {
          log('当前工作名字: ' + work.name + ': 工作完成: 跳出检测循环.')
          break;
        }

        endTime = new Date().getTime()
        spendTime = endTime - startTime
        sleep(work.workConfig.checkStateIntervalTime)
      }

      if (spendTime >= work.limitTime) {
        log('当前工作名字: ' + work.name + ': 第' + j + '次 执行 结束: 耗时: ' + (endTime - startTime) + 'ms, 工作结果: ' + workResult + ' : 已经超时 : 限制时间: ' + work.limitTime)
      }
      workThreadId && workThreadId.isAlive() && workThreadId.interrupt()
      workResult = work.getResult()
      log('当前工作名字: ' + work.name + ': 第' + j + '次 执行 结束: 耗时: ' + (endTime - startTime) + 'ms, 工作结果: ' + workResult)
      if (workResult) {
        break;
      } else {
        work.handleException()
      }
    }
    if (!workResult) {
      log('当前工作流程名字: ' + this.name)
      log('当前工作流程列表: ' + this.workListSummary.join(' --> '))
      log('成功执行的工作列表: ' + this.workListSuccessful.join(' --> '))
      throw new Error('当前工作名字: ' + work.name + ': 执行 发生异常, 且异常处理未成功, 请添加该异常的处理方法')
    }
    this.workListSuccessful.push(workName)
  }
  this.endTime = new Date().getTime()
  log('当前工作流程名字: ' + this.name + ': 执行 结束 : 耗时: ' + (this.endTime - this.startTime) + 'ms')
  log('已完成的工作流程列表: ' + this.workListSummary.join(' --> '))
}

module.exports = Flow