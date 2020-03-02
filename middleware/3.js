module.exports = function () {
  for (var i = 0; i < 3; i++) {
    sleep(100)
    log('this is middleware 3.js   i = ' + i)
  }

}
