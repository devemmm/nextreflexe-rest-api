const Schema = require("./schema");
const { errLogger } = require("../../config/logger");
const _ = require("lodash");
const sequelize = require("../../config/database");
const QueryBuilder = require("../../helpers/queryBuilder");
const { PAYMENT } = require("../../libs/constant");

class Service {
  async save(req) {
    try {
      const reqData = req.body;
      const { patientId, status } = reqData;
      let data = new Schema(reqData);

      const payment = await Schema.findAll({ where: { patientId: patientId }, order: [['createdAt', 'DESC']] });

      let paymentCondition = PAYMENT.CONDITION.INITIAL;

      if (payment.length === 0 || status === PAYMENT.STATUS.PAY) {
        paymentCondition = PAYMENT.CONDITION.INITIAL;
      } else if (payment.length > 0 && status === PAYMENT.STATUS.BEFORE) {
        paymentCondition = PAYMENT.CONDITION.BEFORE;
      } else {
        paymentCondition = PAYMENT.CONDITION.INSUFFICIENT_FOUND
      }

      switch (paymentCondition) {

        case PAYMENT.CONDITION.INITIAL: {
          // this case means that the there is no payment done by this paient before he/she need 
          if (_.isUndefined(reqData.totalSession) || _.isUndefined(reqData.sessionPrice)) {
            throw new Error(PAYMENT.ERROR.SESSION);
          }

          if (_.isUndefined(reqData.visitId)) {
            throw new Error(PAYMENT.ERROR.VISIT)
          }

          data.status = reqData.status;
          data.totalSession = reqData.totalSession;
          data.remainsSession = reqData.totalSession - 1;

          if (reqData.status !== PAYMENT.STATUS.PAY) {
            throw new Error(PAYMENT.ERROR.UNPAID);
          }
          data.totalPayment = reqData.totalSession * reqData.sessionPrice;
          data.pay = reqData.pay;
          data.debit = reqData.pay - reqData.sessionPrice;
          data.credit = 0;

          return await data.save();
        }

        case PAYMENT.CONDITION.BEFORE: {


          data.status = status;
          data.totalSession = payment[0].totalSession;
          data.remainsSession = payment[0].dataValues.remainsSession - 1;
          data.totalPayment = payment[0].totalPayment;
          data.pay = payment[0].sessionPrice;
          data.debit = payment[0].debit - payment[0].sessionPrice;
          data.paymentMethod = payment[0].paymentMethod

          if ((payment[0].debit - payment[0].sessionPrice) < 0) {
            throw new Error(PAYMENT.ERROR.INSUFFICIENT_FOUND)
          }
          data.credit = 0


          return await data.save();
        }

        case PAYMENT.CONDITION.INSUFFICIENT_FOUND: {

          // ADD AMOUNT ON BALANCE
          data.pay = reqData.pay;
          data.debit = payment[0].debit + reqData.pay;
          data.credit = 0

          await data.save();

          const newData = new Schema(reqData)

          // removingNullForAddFoundRecord
          const filteredPayment = payment.filter((item) => item.totalPayment !== null && item.remainsSession !== null)

          newData.status = PAYMENT.STATUS.PAY;
          newData.totalSession = filteredPayment[0].totalSession;
          newData.remainsSession = filteredPayment[0].remainsSession - 1;
          newData.totalPayment = filteredPayment[0].totalPayment;
          newData.pay = filteredPayment[0].sessionPrice;

          newData.paymentMethod = filteredPayment[0].paymentMethod

          const newSlip = await Schema.findAll({ where: { patientId: patientId }, order: [['createdAt', 'DESC']] });

          if ((newSlip[0].debit - filteredPayment[0].sessionPrice) < 0) {
            throw new Error(PAYMENT.ERROR.INSUFFICIENT_FOUND)
          }
          newData.debit = newSlip[0].debit - filteredPayment[0].sessionPrice;
          newData.credit = 0

          return await newData.save();
        }

        default:
          break;
      }
    } catch (e) {
      errLogger.error(e);
      throw new Error(e.message)
    }
  }

  async list(req, skipPaging = false, isActiveList = false) {
    try {

      const { callFunction, query } = await QueryBuilder.LIST_PAYMENT(req)
      let data;

      switch (callFunction) {
        case 'findOne':
          data = await Schema.findOne(query)
          break;
        default:
          data = await Schema.findAndCountAll(query)
      }

      return data;
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
