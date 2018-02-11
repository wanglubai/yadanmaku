import YaDanmakuBase from './YaDanmakuBase';
import YaFactory from './YaFactory';

function YaDanmaku() {
  var tempThis = this;
  tempThis._isInit = false;
  tempThis._display = null;
  tempThis._parent = null;
  tempThis._vo = null;
  tempThis._lineHeight = 40;
  tempThis._voList = [];
  tempThis._itemList = [];
  tempThis._layerMax = 1;
  tempThis._startIndex = 0;
  tempThis._endIndex = 0;
  tempThis._maxNum = -1;
  tempThis._startRatio = 0;
  tempThis._endRatio = 1;

  tempThis.init = function (vo) {
    tempThis._vo = vo;
    tempThis._parent = vo['parent'];
    tempThis._lineHeight = vo['line_height'] ? vo['line_height'] : 40;
    tempThis._layerIndex = vo['max_layer'] ? Math.max(0, vo['max_layer'] - 1) : 0;
    tempThis._maxNum = vo['max_num'] ? vo['max_num'] : -1;
    tempThis._display = $('<div class="YaDanmaku" style="position:relative;width:100%;height:100%;overflow:hidden"></div>');
    $(tempThis._parent).append(tempThis._display);
    tempThis._isInit = true;

    setInterval(function () {
      tempThis.update()
    }, 1000 / 24)
  }

  tempThis.play = function (vo) {
    if (tempThis._maxNum == -1 || tempThis._voList.length < tempThis._maxNum) {
      tempThis._voList.push(vo);
    }
  }

  tempThis.setRatio = function (start, end) {
    tempThis._startRatio = start;
    tempThis._endRatio = end;
  }

  tempThis.update = function () {
    if (tempThis._isInit == false) return;
    if (tempThis._voList.length == 0) return;
    var max = parseInt(tempThis._display.height() / tempThis._lineHeight - 1);
    tempThis._startIndex = parseInt(max * tempThis._startRatio);
    tempThis._endIndex = parseInt(max * tempThis._endRatio);
    tempThis.updateLayer(0);
  }

  tempThis.updateLayer = function (index) {
    if (tempThis._voList.length == 0) return;
    if (index > tempThis._layerIndex) return;
    var curItem;
    var item;
    var vo;
    if (tempThis._itemList[index] == undefined) {
      tempThis._itemList[index] = [];
    }
    var itemArr = tempThis._itemList[index];
    var nextLayer = true;
    for (var i = tempThis._startIndex; i < tempThis._endIndex; i++) {
      if (tempThis._voList.length == 0) return;
      if (itemArr[i] == null) {
        vo = tempThis._voList.shift();
        vo['parent'] = tempThis._display;
        vo['top'] = tempThis._lineHeight * i;
        item = YaFactory.create();
        item.play(vo);
        itemArr[i] = item;
        nextLayer = false;
      } else {
        curItem = itemArr[i];
        if (curItem.canPush()) {
          vo = tempThis._voList.shift();
          vo['parent'] = tempThis._display;
          vo['top'] = tempThis._lineHeight * i;
          vo['speed'] = curItem.getSpeed();
          item = YaFactory.create();
          item.play(vo);
          itemArr[i] = item;
          nextLayer = false;
        }
      }
    }
    if (nextLayer && index < tempThis._layerIndex) {
      tempThis.updateLayer(index + 1);
    }
  }
}

window['YaDanmaku'] = YaDanmaku;