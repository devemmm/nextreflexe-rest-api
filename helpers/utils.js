const moment = require("moment");

class Utils {
  constructor() {
    return this;
  }

  rightNow() {
    return moment().format("YYYY-MM-DD :: hh:mm:ss");
  }
  getDate() {
    return moment().format("YYYY-MM-DD");
  }
}

module.exports = Utils;