const md5 = require('md5')

const tools = {
  md5 (str) {
    return md5(str)
  },
  cateToList (data) {
    var firstArr = []

    for (var i = 0; i < data.length; i++) {
      if (data[i].pid == '0') {
        firstArr.push(data[i])
      }
    }
    // console.log(firstArr);

    for (var i = 0; i < firstArr.length; i++) {
      firstArr[i].list = []
      for (var j = 0; j < data.length; j++) {
        if (firstArr[i]._id == data[j].pid) {
          firstArr[i].list.push(data[j])
        }
      }
    }

    // console.log(firstArr);

    return firstArr
  }
}

module.exports = tools
