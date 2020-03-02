let lib = {
  downloadFile: function (url, path) {
    var r = http.get(url);
    r = r.body.bytes();
    files.writeBytes(path, r);
    return path;
  },
  getAppVersion (appName) {
    function getPackageVersion (packageName) {
      importPackage(android.content);
      var pckMan = context.getPackageManager();
      var packageInfo = pckMan.getPackageInfo(packageName, 0);
      return packageInfo.versionName;
    }
    var packageName = getPackageName(appName);
    return getPackageVersion(packageName);
  },
  toastAndAlert (info) {
    toastLog(info)
    alert(info)
  },
  stopSelf () {
    engines.myEngine().forceStop()
  }
}
module.exports = lib

