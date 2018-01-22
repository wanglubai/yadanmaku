class YaDebug {
  constructor() {

  }
  error() {
    console.log(arguments);
  }
  log() {
    console.log(arguments);
  }
  toString() {

  }
}
module.exports = new YaDebug();