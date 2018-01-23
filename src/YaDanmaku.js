var YaDanmakuBase = require('./YaDanmakuBase');

function YaDanmaku() {
  var tempThis = this;
  tempThis._isInit = false;
  tempThis._display = null;
  tempThis._parent = null;
  tempThis._vo = null;
  tempThis._gapH = 40;
  tempThis._voList = [];
  tempThis._itemList = [];

  tempThis.init = function (vo) {
    tempThis._vo = vo;
    tempThis._parent = vo['parent'];
    tempThis._gapH = vo['gapH'] ? vo['gapH'] : 40;
    tempThis._display = $('<div class="YaDanmaku" style="position:relative;width:100%;height:100%;overflow:hidden"></div>');
    $(tempThis._parent).append(tempThis._display);
    tempThis._isInit = true;

    setInterval(function () {
      tempThis.update()
    }, 1000 / 24)
  }

  tempThis.play = function (vo) {
    tempThis._voList.push(vo);
  }

  tempThis.update = function () {
    if (tempThis._isInit == false) return;
    var maxIndex = parseInt(tempThis._display.height() / tempThis._gapH-1);
    var curItem;
    var item;
    var vo;
    for (var i = 0; i < maxIndex; i++) {
      if (tempThis._voList.length == 0) return;
      if (tempThis._itemList[i] == null) {
        vo = tempThis._voList.shift();
        vo['parent'] = tempThis._display;
        vo['top'] = tempThis._gapH * i;
        item = new YaDanmakuBase();
        item.play(vo);
        tempThis._itemList[i] = item;
        break;
      } else {
        curItem = tempThis._itemList[i];
        if (curItem.canPush()) {
          vo = tempThis._voList.shift();
          vo['parent'] = tempThis._display;
          vo['top'] = tempThis._gapH * i;
          vo['speed'] = curItem.getSpeed();
          item = new YaDanmakuBase();
          item.play(vo);
          tempThis._itemList[i] = item;
          break;
        }
      }
    }
  }
}
module.exports = YaDanmaku;
window['YaDanmaku'] = YaDanmaku;