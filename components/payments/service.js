const Schema = require("./schema");
const { errLogger } = require("../../config/logger");
const _ = require("lodash");
const sequelize = require("../../config/database");
const QueryBuilder = require("../../helpers/queryBuilder");
const Constant = require("../../libs/constant");

class Service {
  async save(req) {
    try {
      const reqData = req.body;
      const { patientId, status, paymentMethod } = reqData;
      let data = new Schema(reqData);

      const payment = await Schema.findAll({ patientId });

      if (payment.length === 0) {
        if (_.isUndefined(reqData.totalSession)) {
          throw new Error(Constant.PAYMENT.ERROR.SESSION);
        }

        data.status = reqData.status;
        data.totalSession = reqData.totalSession;
        data.remainsSession = reqData.totalSession - 1;

        if (reqData.status !== Constant.PAYMENT.STATUS.PAY) {
          throw new Error(Constant.PAYMENT.ERROR.UNPAID);
        }
        data.totalPayment = reqData.totalSession * reqData.sessionPrice;
        data.pay = reqData.pay;
        data.debit = reqData.pay - reqData.sessionPrice;
        data.credit = 0;

        delete data.visitId;

        return await data.save();
      } else {
        console.log([]);

        return [];
      }
    } catch (e) {
      errLogger.error(e);
      throw new Error(e.message)
    }
  }

  async list(req, skipPaging = false, isActiveList = false) {
    try {
      const metadata = await QueryBuilder.LIST_PAYMENT(req);

      return { patients: metadata, rows: metadata.length };
    } catch (e) {
      errLogger.error(e);
      throw new Error(e.message)
    }
  }

  async update(params) {
    try {
      const query =
        "UPDATE payment SET createdBy='Emmanuell' where branchId='RW01';";
      const [results, metadata] = await sequelize.query(query);

      if (metadata.affectedRows > 0 && metadata.changedRows > 0) {
        return { resullt: "branch_updated_successfull" };
      }

      return { resullt: "something_went_wrong" };
    } catch (e) {
      errLogger.error(e);
      throw new Error(e.message)
    }
  }

  async delete(params) {
    try {
      return { data: [] };
    } catch (error) {
      errLogger.error(e);
      throw new Error(e.message)
    }
  }
}

module.exports = Service;
