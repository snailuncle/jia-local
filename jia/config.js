module.exports = {
  work: {
    default: {
      name: '匿名工作',
      limitTime: 5000,
      action: function () { return true },
      handleException: function () { return true },
      expectedWidgetList: [],
      checkStateIntervalTime: 100,
      searchWidgetLimitTime: 1000,
      execAppName: 'Auto.js Pro',
      showView: true,
      retryCount: 2,
    }
  }
}


