
let lib = require('./lib')
let allowedProperties = [
  'text',
  'textContains',
  'textStartsWith',
  'textEndsWith',
  'textMatches',
  'desc',
  'descContains',
  'descStartsWith',
  'descEndsWith',
  'descMatches',
  'id',
  'idContains',
  'idStartsWith',
  'idEndsWith',
  'idMatches',
  'className',
  'classNameContains',
  'classNameStartsWith',
  'classNameEndsWith',
  'classNameMatches',
  'packageName',
  'packageNameContains',
  'packageNameStartsWith',
  'packageNameEndsWith',
  'packageNameMatches',
  'bounds',
  'boundsInside',
  'boundsContains',
  'drawingOrder',
  'clickable',
  'longClickable',
  'checkable',
  'selected',
  'enabled',
  'scrollable',
  'editable',
  'multiLine',
  'findOne',
  'findOne',
  'findOnce',
  'findOnce',
  'find',
  'untilFind',
  'exists',
  'waitFor',
  'filter'
]




function widgetInspect (widgetList, workConfig) {
  let searchWidgetLimitTime = workConfig.searchWidgetLimitTime
  if (!widgetList) {
    return true;
  }
  if (lib.getObjType(widgetList) === 'Array') {
    if (widgetList.length > 0) {
      log('当前搜索的控件列表是:')
      log(widgetList)
      var len = widgetList.length
      var widgetFindStatementList = []
      for (var i = 0; i < len; i++) {
        let widget = widgetList[i]
        let widgetFindStatement = ['selector()']
        for (let k in widget) {
          if (allowedProperties.indexOf(k) > -1) {
            let v = widget[k]
            switch (k) {
              case "text":
              case "id":
              case "desc":
              case "textContains":
              case "textStartsWith":
              case "textEndsWith":
              case "descContains":
              case "descStartsWith":
              case "descEndsWith":
              case "idContains":
              case "idStartsWith":
              case "idEndsWith":
                v = util.format('%s("%s")', k, v)
                break;
              case "textMatches":
              case "descMatches":
              case "idMatches":
              case "classNameMatches":
              case "packageNameMatches":
                if (lib.countsTheNumberOfCharactersInAString(v, '/') >= 2) {
                  v = util.format('%s(%s)', k, v)
                } else {
                  v = util.format('%s("%s")', k, v)
                }
                break;
              case "bounds":
              case "boundsInside":
              case "boundsContains":
                v = util.format('%s(%s)', k, v)
                break;
            }
            widgetFindStatement.push(v)
          } else {
            throw new Error('不允许该控件属性: ' + k)
          }
        }
        widgetFindStatement = widgetFindStatement.join('.')
        widgetFindStatement = util.format('%s.visibleToUser(true).findOne(%d)', widgetFindStatement, searchWidgetLimitTime)
        widgetFindStatementList.push(widgetFindStatement)
        log('widgetFindStatement=')
        log(widgetFindStatement)
        var view = eval(widgetFindStatement)
        if (view && workConfig.showView) {
          lib.showView(view)
        }
      }
      log('控件搜索语句 = ' + widgetFindStatementList.join(';\n'))
      widgetFindStatementList.push('true')
      return eval(widgetFindStatementList.join(' && '))
    } else {
      return true
    }
  }
  throw new Error('widgetList控件列表应该是数组, 请输入正确的widgetList')
}


module.exports = widgetInspect