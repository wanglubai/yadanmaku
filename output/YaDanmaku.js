/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var YaDanmakuBase = __webpack_require__(1);

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
      tempThis.update();
    }, 1000 / 24);
  };

  tempThis.play = function (vo) {
    if (tempThis._maxNum == -1 || tempThis._voList.length < tempThis._maxNum) {
      tempThis._voList.push(vo);
    }
  };

  tempThis.setRatio = function (start, end) {
    tempThis._startRatio = start;
    tempThis._endRatio = end;
  };

  tempThis.update = function () {
    if (tempThis._isInit == false) return;
    if (tempThis._voList.length == 0) return;
    var max = parseInt(tempThis._display.height() / tempThis._lineHeight - 1);
    tempThis._startIndex = parseInt(max * tempThis._startRatio);
    tempThis._endIndex = parseInt(max * tempThis._endRatio);
    tempThis.updateLayer(0);
  };

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
        item = new YaDanmakuBase();
        item.play(vo);
        itemArr[i] = item;
        nextLayer = false;
        break;
      } else {
        curItem = itemArr[i];
        if (curItem.canPush()) {
          vo = tempThis._voList.shift();
          vo['parent'] = tempThis._display;
          vo['top'] = tempThis._lineHeight * i;
          vo['speed'] = curItem.getSpeed();
          item = new YaDanmakuBase();
          item.play(vo);
          itemArr[i] = item;
          nextLayer = false;
          break;
        }
      }
    }
    if (nextLayer && index < tempThis._layerIndex) {
      tempThis.updateLayer(index + 1);
    }
  };
}

module.exports = YaDanmaku;
window['YaDanmaku'] = YaDanmaku;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
  };
  tempThis.destroy = function () {
    tempThis._isDestroy = true;
    tempThis._canPush = true;
    tempThis._display.empty();
    tempThis._display.remove();
    tempThis._display = null;
  };
  tempThis.getSpeed = function () {
    return tempThis._speed;
  };
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
  };
}

module.exports = YaDanmakuBase;

/***/ })
/******/ ]);