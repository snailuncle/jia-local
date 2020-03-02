module.exports = function () {
  for (var i = 0; i < 3; i++) {
    sleep(100)
    log('this is middleware 2.js   i = ' + i)
  }

}
