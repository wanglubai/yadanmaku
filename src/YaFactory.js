import YaDanmakuBase from './YaDanmakuBase';

function YaFactory() {
  var tempThis = this;
  tempThis._pool = [];

  tempThis.create = function () {
    if (tempThis._pool.length > 0) {
      return tempThis._pool.pop();
    } else {
      var item = new YaDanmakuBase()
      return item;
    }
  }

  tempThis.recycle = function (ele) {
    tempThis._pool.push(ele);
  }
}

export default new YaFactory();