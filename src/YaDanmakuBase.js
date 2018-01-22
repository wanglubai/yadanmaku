var debug = require('./YaDebug');

class YaDanmakuBase {
  constructor(vo) {
    this._vo = vo;
    if (vo.parent == undefined) {
      debug.error('vo.parent==undefined');
      return;
    }

    this.initDom();
  }
  initDom() {
    this._parent = vo.parent;
    this._display = document.createElement('div');
    this._display.className = 'YaDanmakuBase';
    this._parent.appendChild(this._display);
  }
  initCss() {
    this._display.style.position = 'absolute';
  }
  toString() {

  }
}
module.exports = YaDanmakuBase;