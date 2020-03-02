module.exports = {
  flow: {
    qq群发送时间: {
      name: 'qq群发送时间',
      workList: [],
      importConfiguration: function () {
        return require('./workConfig/qq群发送时间')
      }
    },
  }
}