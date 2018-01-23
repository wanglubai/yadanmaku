var debug = require('./YaDebug');

function YaDanmakuBase(vo) {
  var tempThis = this;
  tempThis._isDestroy = false;
  tempThis._canPush = false;
  tempThis._isInit = false;
  tempThis._vo = null;
  tempThis._parent = null;

  tempThis.play = function (vo) {
    tempThis._vo = vo;
    tempThis._speed = vo['speed'] ? vo['speed'] : 2 * Math.random() + 2;
    tempThis._parent = vo['parent'];
    tempThis._display = $("<div class='YaDanmakuBase' style='position:absolute;top:" + vo['top'] + "px;transform:translateX(" + tempThis._parent.width() + "px)'></div>");
    tempThis._display.append(vo['msg']);
    vo['class'] && tempThis._display.addClass(vo['class']);
    tempThis._parent.append(tempThis._display);

    var time = parseInt((tempThis._parent.width() - tempThis._display.width()) / tempThis._speed / 24);
    tempThis._display.css('transition', "-webkit-transform " + time + "s linear");
    tempThis._display.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', tempThis.destroy);
    setTimeout(function () {
      tempThis._isInit = true;
      tempThis._display.css('transform', 'translateX(' + -tempThis._display.width() + 'px)');
    }, 1);
  }
  tempThis.destroy = function () {
    tempThis._isDestroy = true;
    tempThis._canPush = true;
    tempThis._display.empty();
    tempThis._display.remove();
    tempThis._display = null;
  }
  tempThis.getSpeed = function () {
    return tempThis._speed;
  }
  tempThis.canPush = function () {
    if (tempThis._isInit == false) {
      return false;
    }
    if (tempThis._canPush || tempThis._isDestroy) {
      return true;
    }
    if (tempThis._display.offset().left < tempThis._parent.width() - tempThis._display.width()-20) {
      return true;
    }
    return false;
  }
}

module.exports = YaDanmakuBase;