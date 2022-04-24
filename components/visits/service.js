const Schema = require("./schema");
const Appointment = require("../appointments/schema");
const { errLogger } = require("../../config/logger");
const _ = require("lodash");
const sequelize = require("../../config/database");
const QueryBuilder = require("../../helpers/queryBuilder");
const Util = require("../../helpers/utils");
const Constants = require("../../libs/constant");
const moment = require("moment");

class Service {
  async save(req) {
    try {
      if (
        !_.isUndefined(req.query.appointment) &&
        req.query.appointment === "true"
      ) {
        const { appointmentId, doctorId, time } = req.body;

        if (
          _.isUndefined(appointmentId) ||
          _.isUndefined(doctorId) ||
          _.isUndefined(time)
        ) {
          throw new Error(
            "missing some required values please check in required body"
          );
        }

        const appointment = await Appointment.findOne({
          where: { id: appointmentId },
        });

        if (!appointment) {
          throw new Error("appointment_not_found");
        }

        if (appointment.status !== "PENDING") {
          throw new Error("appointment successfull");
        }

        const visit = new Schema({
          startTime: new Util().rightNow(),
          endTime: moment(new Util().rightNow())
            .add(time, "m")
            .format(Constants.MOMENT_TIME_FOMART),
          status: "PENDING",
          appointmentId: appointment.id,
          patientId: appointment.patientId,
          branchId: appointment.branchId,
          doctorId,
          userId: appointment.doctorId,
        });

        // 1. SAVE VISIT
        await visit.save();
        // 2. UPDATE APPIINTMENT
        appointment.status = "SUCCESS";
        await appointment.save();
        // 3. PUSH MESSAGE

        return appointment;
      } else {
        const { patientId, branchId, doctorId, time } = req.body;

        if (
          _.isUndefined(patientId) ||
          _.isUndefined(branchId) ||
          _.isUndefined(doctorId) ||
          _.isUndefined(time)
        ) {
          throw new error(
            "missing some required values please check in required body"
          );
        }
        const visit = new Schema({
          startTime: new Util().rightNow(),
          endTime: moment(new Util().rightNow())
            .add(time, "m")
            .format(Constants.MOMENT_TIME_FOMART),
          status: "PENDING",
          patientId,
          branchId,
          doctorId,
          userId: doctorId,
        });

        return await visit.save();
      }
    } catch (e) {
      errLogger.error(e);
    }
  }

  async list(req) {
    try {
      const { callFunction, query } = QueryBuilder.LIST_VISIT(req);

      let data;

      switch (callFunction) {
        case "findOne":
          data = await Schema.findOne(query);
          break;
        default:
          data = await Schema.findAndCountAll(query);
      }

      return data;
    } catch (error) {
      errLogger.error(e);
    }
  }

  async update(params) {
    try {
      const query =
        "UPDATE branch_location SET createdBy='Emmanuell' where branchId='RW01';";
      const [results, metadata] = await sequelize.query(query);

      if (metadata.affectedRows > 0 && metadata.changedRows > 0) {
        return { resullt: "branch_updated_successfull" };
      }

      return { resullt: "something_went_wrong" };
    } catch (error) {
      errLogger.error(e);
    }
  }

  async delete(params) {
    try {
      return { data: [] };
    } catch (error) {
      errLogger.error(e);
    }
  }
}

module.exports = Service;
