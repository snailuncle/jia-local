let Publisher = (
  function () {
    var _messages = {}
    return {
      // 订阅
      subscribe: function (type, fn) {
        if (typeof _messages[type] === 'undefined') {
          _messages[type] = [fn]
        } else {
          _messages[type].push(fn)
        }
      },
      // 取消订阅
      unsubscribe: function (type, fn) {
        if (_messages[type] instanceof Array) {
          var i = _messages[type].length - 1;
          for (; i >= 0; i--) {
            _messages[type][i] === fn && _messages[type].splice(i, 1)
          }
        }
      },
      // 发布
      publish: function (type, args) {
        if (!_messages[type]) return;
        len = _messages[type].length
        for (var i = 0; i < len; i++) {
          _messages[type][i].call(this, args)
        }
      },
    }
  }
)()
module.exports = Publisher