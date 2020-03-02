// 脚本文件夹下面的js文件  全部转移动 /sdcard/**.txt



var dir = '/sdcard/脚本';
var jsFiles = files.listDir(dir, function(name) {
  return files.isFile(files.join(dir, name));
});
log(jsFiles);

jsFiles.map(file => {
  var fileFullPath = files.join(dir, file);
  log(fileFullPath);
  if (files.isFile(fileFullPath)) {
    
    var filename=files.getNameWithoutExtension(fileFullPath)
    files.copy(fileFullPath, "/sdcard/"+filename+".txt")
  }
});

