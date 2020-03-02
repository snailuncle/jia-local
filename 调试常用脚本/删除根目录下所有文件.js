var dir = "/sdcard/";
var jsFiles = files.listDir(dir, function(name) {
  return files.isFile(files.join(dir, name));
});
jsFiles.map(file => {
  log(file)
  var fileFullPath = files.join(dir, file);
  if (files.isFile(fileFullPath)) {
    files.remove(fileFullPath);
  }
});
