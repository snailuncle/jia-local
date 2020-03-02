
// 全局变量就在main.js中设置, 因为不做点什么, 好像这个文件就没必要存在
// =========================单例toast 开始===============================================================
let singleton;
var storageSingleton = storages.create("singleton");
let toast = function () {
  function TOAST (msg) {
    storageSingleton.put("msg", msg.toString());
    ui.run(
      function () {
        let msg = storageSingleton.get("msg")
        if (!singleton) {
          // log('创建新的toast实例')
          singleton = android.widget.Toast.makeText(context, msg, android.widget.Toast.LENGTH_SHORT);
        } else {
          singleton.setText(msg);
        }
        singleton.show();
        log(msg)
      }
    )
  }
  return TOAST
}()
// =========================单例toast 结束===============================================================


// // 执行主脚本之前, 要做的一些事情, 比如验证账号什么的, 虽然很好破解, 聊胜于无
// let middlewareList = [
//   require('./middleware/1'),
//   require('./middleware/2'),
//   require('./middleware/3'),
// ]
// middlewareList.map((item) => {
//   item()
// })


let controller = require('./controller')
controller.run()

