const Schema = require("./schema");
const Appointment = require("../appointments/schema");
const { errLogger } = require("../../config/logger");
const _ = require("lodash");
const sequelize = require("../../config/database");
const QueryBuilder = require("../../helpers/queryBuilder");
const Util = require("../../helpers/utils");
const Constants = require("../../libs/constant");
const moment = require("moment");
const { responses: RESPONSES, PRIVILAGES } = require('../../libs/constant')


class Service {
  async save(req) {
    try {
      if (
        !_.isUndefined(req.query.appointment) &&
        req.query.appointment === "true"
      ) {
        const { appointmentId, userId, time } = req.body;

        if (
          _.isUndefined(appointmentId) ||
          _.isUndefined(userId) ||
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
          userId: appointment.userId,
        });

        // 1. SAVE VISIT
        await visit.save();
        // 2. UPDATE APPOINTMENT
        appointment.status = "SUCCESS";
        await appointment.save();
        // 3. PUSH MESSAGE

        return appointment;
      } else {
        const { patientId, branchId, userId, time, serviceId } = req.body;

        if (
          _.isUndefined(patientId) ||
          _.isUndefined(branchId) ||
          _.isUndefined(userId) ||
          _.isUndefined(time)
        ) {
          throw new Error(
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
          userId,
          serviceId
        });

        return await visit.save();
      }
    } catch (e) {
      errLogger.error(e);
      throw new Error(e.message)
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
    } catch (e) {
      errLogger.error(e);
      throw new Error(e.message)
    }
  }

  async update(req) {
    try {
      const visit = await Schema.findByPk(req.params.id)

      if (!visit || visit.status === "DELETED") {
        throw new Error("visit nof found")
      }

      if (req.user.userType !== PRIVILAGES.ADMIN.VALUE || req.user.userType !== PRIVILAGES.SUPER_ADMIN.VALUE) {
        if (req.user.branchId !== visit.branchId) {
          throw new Error(RESPONSES.UNAUTHORIZED_REQUEST.MSG)
        }
      }

      visit.status = req.body?.status?.toUpperCase()

      return await visit.save();
    } catch (e) {
      errLogger.error(e);
      throw new Error(e.message)
    }
  }

  async delete(req) {
    try {

      let visit = await Schema.findByPk(req.params.id)

      if (!visit || visit.status === "DELETED") {
        throw new Error('visit not found')
      }

      if (req.user.userType !== PRIVILAGES.ADMIN.VALUE || req.user.userType !== PRIVILAGES.SUPER_ADMIN.VALUE) {
        if (req.user.branchId !== visit.branchId) {
          throw new Error(RESPONSES.UNAUTHORIZED_REQUEST.MSG)
        }
      }

      visit.status = "DELETED"

      return await visit.save()
    } catch (e) {
      errLogger.error(e);
      throw new Error(e.message)
    }
  }
}

module.exports = Service;
