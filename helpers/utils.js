const moment = require("moment");
const Constant = require('../libs/constant')

class Utils {
  constructor() {
    return this;
  }

  rightNow() {
    return moment().format(Constant.MOMENT_TIME_FOMART);
  }
  getDate() {
    return moment().format("YYYY-MM-DD");
  }
}

module.exports = Utils;