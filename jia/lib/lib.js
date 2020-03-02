let config = require('../config')
module.exports = {
  getObjType (obj) {
    // JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.
    var result = Object.prototype.toString.call(obj);
    result = result.match(/ \w+/)[0];
    result = result.replace(/ /g, "");
    return result;
  },

  countsTheNumberOfCharactersInAString (str, char) {
    var arr = str
    var obj = {};
    obj[char] = 0;
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i];
      if (key === char) {
        obj[char]++;
      }
    }
    return obj[char]
  },
  打开指定app的无障碍 (appName) {
    log(arguments.callee.name)
    if (!appName) {
      appName = config.work.default.execAppName
    }
    var packageName = getPackageName(appName);
    importClass(android.provider.Settings);
    try {
      var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
      // adb开启无障碍
      // adb shell settings put secure enabled_accessibility_services com.dw.yk/com.stardust.autojs.core.accessibility.AccessibilityService
      enabledServices = enabledServices.replace(new RegExp(packageName + "/com.stardust.autojs.core.accessibility.AccessibilityService", 'g'), '')
      enabledServices = enabledServices.replace(':::', '')
      var Services = enabledServices + ":" + packageName + "/com.stardust.autojs.core.accessibility.AccessibilityService";
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, "1");
      log("成功开启辅助服务");
    } catch (error) {
      //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
      log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
      log("adb shell pm grant " + packageName + " android.permission.WRITE_SECURE_SETTINGS")
      setClip("adb shell pm grant " + packageName + " android.permission.WRITE_SECURE_SETTINGS");
    }
    sleep(100)
  },
  关闭指定app的无障碍 (appName) {
    log(arguments.callee.name)
    if (!appName) {
      appName = config.work.default.execAppName
    }
    var packageName = getPackageName(appName);
    importClass(android.provider.Settings);
    try {
      var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
      // adb开启无障碍
      // adb shell settings put secure enabled_accessibility_services com.dw.yk/com.stardust.autojs.core.accessibility.AccessibilityService
      enabledServices = enabledServices.replace(new RegExp(packageName + "/com.stardust.autojs.core.accessibility.AccessibilityService", 'g'), '')
      enabledServices = enabledServices.replace(':::', '')
      var Services = enabledServices;
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, "1");
      log("成功关闭辅助服务");
    } catch (error) {
      //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
      log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
      log("adb shell pm grant " + packageName + " android.permission.WRITE_SECURE_SETTINGS")
      setClip("adb shell pm grant " + packageName + " android.permission.WRITE_SECURE_SETTINGS");
    }
    sleep(100)
  },
  常驻通知 () {
    log(arguments.callee.name)
    importClass(android.app.Notification);
    importClass(android.graphics.BitmapFactory);
    importClass(android.content.Context);
    importClass(android.os.Build);
    importClass("android.app.PendingIntent");

    //第一步：实例化通知栏构造器Notification.Builder：
    var builder = new Notification.Builder(context);
    //第二步：获取状态通知栏管理：
    var mNotifyMgr = context.getSystemService(context.NOTIFICATION_SERVICE);
    //第三步 获取图标
    var iconName = "ic_cloud_circle_black_48dp";
    var icon = getResourceID(iconName, "drawable");
    //第四步 获取channelId
    var channelId = java.lang.String.valueOf(123456); // 至少6位数
    //第五步：对Builder进行配置：
    builder
      .setContentTitle("My notification") //标题
      .setContentText("Hello World!") // 详细内容
      .setTicker("New message") //第一次推送，角标旁边显示的内容
      .setSmallIcon(icon) //设置小图标
      .setLargeIcon(android.graphics.BitmapFactory.decodeResource(context.getResources(), icon))
      .setChannelId(channelId)
      .setWhen(java.lang.System.currentTimeMillis())
      .setDefaults(Notification.DEFAULT_ALL) //打开呼吸灯，声音，震动，触发系统默认行为
      .setVisibility(Notification.VISIBILITY_PRIVATE)
      .setPriority(Notification.PRIORITY_DEFAULT) //设置该通知优先级
      .setCategory(Notification.CATEGORY_MESSAGE); //设置通知类别
    //第六步：发送通知请求：
    var notify = builder.build(); //得到一个Notification对象
    var buiderID = 1; // 同一个buiderID会覆盖, 如果不同,就会有多个通知
    mNotifyMgr.notify(buiderID, notify); //发送通知请求

    function getResourceID (name, defType) {
      //获取资源文件ID
      //参数
      //defType 类名 如drawable id string等
      //name 资源名
      var resource = context.getResources();
      return resource.getIdentifier(name, defType, context.getPackageName());
    }
  },
  showView (view, duration) {
    var window, paint, bitmap, bitmapCanvas;
    var duration = duration || 2000;
    function 创建悬浮窗 () {
      window = floaty.rawWindow('<canvas id="board" h="{{device.height}}" w="{{device.width}}" />');
      // setInterval(() => {}, 3000)
      window.setSize(device.width, device.height);
      window.setTouchable(false);
      // window.setPosition(0, 110)
      // var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
      bitmap = android.graphics.Bitmap.createBitmap(device.width, device.height, android.graphics.Bitmap.Config.ARGB_8888);
      bitmapCanvas = new Canvas(bitmap);
      paint = new Paint();
      paint.setStrokeWidth(10);
      var color = "#00ff00";
      color = colors.parseColor(color);
      paint.setColor(color);
      paint.setStyle(Paint.Style.STROKE);
      paint.setTextAlign(Paint.Align.CENTER);
      paint.setTextSize(35);
      window.board.on("draw", function (canvas) {
        canvas.drawBitmap(bitmap, 0, 0, paint);
      });
    }

    function showView (view) {
      创建悬浮窗();
      var bounds = view.bounds();
      var left = bounds.left;
      var top = bounds.top;
      var right = bounds.right;
      var bottom = bounds.bottom;
      if (left > right) {
        left = device.width / 3;
        right = (device.width / 3) * 2;
      }
      var originalStrokeWidth = paint.getStrokeWidth();
      var originalColor = paint.getColor();
      var rndColor = getRndColor();
      var color = colors.parseColor(rndColor);
      paint.setColor(color);
      paint.setStrokeWidth(20);
      画矩形(left, top, right, bottom);
      paint.setColor(originalColor);
      paint.setStrokeWidth(originalStrokeWidth);
    }

    function 画矩形 (left, top, right, bottom) {
      bitmapCanvas.drawRect(left, top, right, bottom, paint);
    }

    function getRndColor () {
      var a, r, g, b;
      (a = Math.floor(0)), (r = Math.floor(随机0_255())), (g = Math.floor(随机0_255())), (b = Math.floor(随机0_255()));
      // var 反色 = -1 - colors.argb(0, r, g, b);
      var color = colors.argb(0, r, g, b);
      color = colors.toString(color);
      return color;
    }

    function 随机0_255 () {
      var r = parseInt(255 * Math.random());
      return r;
    }

    showView(view);
    sleep(duration);
  },
  设置窗口过滤器 () {
    auto.setWindowFilter(function (window) {
      return true;
    });
  }
}