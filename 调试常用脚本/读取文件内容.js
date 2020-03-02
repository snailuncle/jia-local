"ui";
ui.layout(
  <vertical>
    <button id="btn">123</button>
    <horizontal>
      <text text="文件名"></text>
      <input id="fileName" w="*"></input>
    </horizontal>
    <scroll>
      <horizontal margin="30 30 30 30">
        <text text="文件列表"></text>
        <text id="filesList" w="*"></text>
      </horizontal>
    </scroll>
  </vertical>
);
fromPath="/storage/emulated/0/anchorName.txt.txt"
files.copy(fromPath, fromPath+'.copy.txt')

ui.btn.click(function() {
  var fileName = ui.fileName.text();
  if (!fileName) {
    ui.fileName.setText("dytext.txt");
    fileName = ui.fileName.text();
  }
  var result = 获取指定字符串结尾的最新文件路径(fileName);
  log(result);
  ui.filesList.setText(result);
});

function 文件修改时间(path) {
  var time = new java.io.File(files.path(path)).lastModified();
  return time;
}
function 获取指定字符串结尾的最新文件路径(endStr, dir) {
  var dir = dir || files.getSdcardPath();
  var jsFiles = files.listDir(dir, function(name) {
    return strEndsWith(name.toLowerCase(), endStr.toLowerCase()) && files.isFile(files.join(dir, name));
  });
  jsFiles = jsFiles.map(jsFile => {
    log("jsFile = " + jsFile);
    return files.join(dir, jsFile);
  });
  var len = jsFiles.length;
  for (var i = 0; i < len; i++) {
    jsFile = jsFiles[i];
    var time = 文件修改时间(jsFile);
    var result = {
      path: jsFile,
      time: time
    };
    jsFiles[i] = result;
  }
  log(jsFiles);
  var info = "";
  for (var i = 0; i < jsFiles.length; i++) {
    var fileName = jsFiles[i].path;
    var fileContent = files.read(fileName);
    var result = {
      fileName: fileName,
      fileContent: fileContent
    };
    info += JSON.stringify(result) + "\n";
  }
  return jsFiles.length + "\n" + info;
  if (jsFiles.length === 1) {
    log("只有一个文件");
    return jsFiles[0].path;
  } else {
    function compare(k) {
      return function(a, b) {
        var value1 = a[k];
        var value2 = b[k];
        return value2 - value1;
      };
    }
    log(jsFiles);
    jsFiles.sort(compare("time"));
    log(jsFiles);
    if (jsFiles.length > 0) {
      return jsFiles[0].path;
    } else {
      log("没有后缀为: " + endStr + " 的文件");
    }
  }
}
function strEndsWith(str, endStr) {
  var d = str.length - endStr.length;
  return d >= 0 && str.lastIndexOf(endStr) == d;
}
