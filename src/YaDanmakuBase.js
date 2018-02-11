import YaFactory from './YaFactory';

function YaDanmakuBase(vo) {
  var tempThis = this;
  tempThis._isDestroy = false;
  tempThis._canPush = false;
  tempThis._isInit = false;
  tempThis._vo = null;
  tempThis._parent = null;
  tempThis._display = $("<div></div>");
  tempThis.play = function (vo) {
    tempThis._isDestroy = false;
    tempThis._canPush = false;
    tempThis._isInit = false;

    tempThis._vo = vo;
    tempThis._speed = vo['speed'] ? vo['speed'] : 2 * Math.random() + 3;
    tempThis._parent = vo['parent'];

    tempThis._display[0].className = 'YaDanmakuBase';
    tempThis._display[0].style = '';

    vo['class'] && tempThis._display.addClass(vo['class']);
    tempThis._parent.append(tempThis._display);
    tempThis._display.append(vo['msg']);

    tempThis._display.css('position', "absolute");
    tempThis._display.css('top', vo['top'] + "px");
    tempThis._display.css('transform', "translateX(" + tempThis._parent.width() + "px");

    var time = parseInt((tempThis._parent.width() - tempThis._display.width()) / tempThis._speed / 24);
    tempThis._display.css('transition', "-webkit-transform " + time + "s linear");
    tempThis._display.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', tempThis.destroy);
    setTimeout(function () {
      tempThis._isInit = true;
      tempThis._display.css('transform', 'translateX(' + -tempThis._display.width() + 'px)');
    }, 1);
  }
  tempThis.destroy = function () {
    tempThis._display.empty();
    tempThis._display[0].className = '';
    YaFactory.recycle(tempThis);
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
    if (tempThis._display.position().left < tempThis._parent.width() - tempThis._display.width() - 20) {
      return true;
    }
    return false;
  }
}

export default YaDanmakuBase;