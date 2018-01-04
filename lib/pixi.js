if (process.browser) {
  module.exports = require('pixi.js');
} else {
  module.exports = {};
}
