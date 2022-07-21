const _ = require("lodash");
const sequelize = require("../config/database");
const { Op } = require("sequelize");
const { PRIVILAGES } = require('../libs/constant')

class QueryBuilder {

  static async BRANCH_LIST(req, skipPageLimit) {
    const reqData = req.query;

    let query = {};
    let callFunction = "findOne";

    query.where = {};
    query.include = [
      { model: sequelize.modelManager.getModel("location") },
    ];

    if (reqData.id) {
      query.where.id = reqData.id;
    }

    if (reqData.name) {
      query.where.name = reqData.name;
    }

    if (reqData.search) {
      callFunction = "findAndCountAll";

      if (_.isUndefined(reqData.byLocation)) {
        query.where = {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${reqData.search}%`,
              },
            },
            {
              managerId: {
                [Op.like]: `%${reqData.search}%`,
              },
            },
            {
              id: {
                [Op.like]: `%${reqData.search}%`,
              },
            },
          ],
        };
      } else {
        query.include = [
          {
            model: sequelize.modelManager.getModel("location"),
            where: {
              [Op.or]: [
                {
                  id: {
                    [Op.like]: `%${reqData.search}%`,
                  },
                },
                {
                  country: {
                    [Op.like]: `%${reqData.search}%`,
                  },
                },
                {
                  province: {
                    [Op.like]: `%${reqData.search}%`,
                  },
                },
                {
                  district: {
                    [Op.like]: `%${reqData.search}%`,
                  },
                },
                {
                  sector: {
                    [Op.like]: `%${reqData.search}%`,
                  },
                },
                {
                  cell: {
                    [Op.like]: `%${reqData.search}%`,
                  },
                },
                {
                  branchId: {
                    [Op.like]: `%${reqData.search}%`,
                  },
                },
                {
                  createdBy: {
                    [Op.like]: `%${reqData.search}%`,
                  },
                },
              ],
            },
          },
        ];
      }
    }

    if (
      !_.isUndefined(reqData.visit) &&
      reqData.visit.toLowerCase() === "true"
    ) {
      callFunction = "findAndCountAll";
      if (!_.isUndefined(reqData.visitStatus)) {
        query.include.push({
          model: sequelize.modelManager.getModel("visit"),
          where: {
            status: reqData.visitStatus.toUpperCase(),
          },
        });
      } else {
        query.include.push({ model: sequelize.modelManager.getModel("visit") });
      }
    }

    if (
      !_.isUndefined(reqData.appointment) &&
      reqData.appointment.toLowerCase() === "true"
    ) {
      callFunction = "findAndCountAll";
      if (!_.isUndefined(reqData.appointmentStatus)) {
        query.include.push({
          model: sequelize.modelManager.getModel("appointment"),
          where: {
            status: reqData.appointmentStatus.toUpperCase(),
          },
        });
      } else {
        query.include.push({
          model: sequelize.modelManager.getModel("appointment"),
        });
      }
    }

    if (_.isEmpty(reqData)) {
      delete query.where;
      callFunction = "findAndCountAll";
    }

    return { callFunction, query };
  }


  // ----------------------------VISIT-----------------------------------------------
  static LIST_VISIT(req) {
    let query = {};
    const reqData = req.query;
    let callFunction = "findOne";

    query.where = {};

    // if (req.user.userType === PRIVILAGES.SUPER_ADMIN.VALUE || req.user.userType === PRIVILAGES.SUPER_ADMIN.VALUE) {
    //   callFunction = "findAndCountAll"

    // } else {
    //   callFunction = "findAndCountAll"
    //   query.where.branchId = req.user.branchId;
    // }

    query.include = [
      { model: sequelize.modelManager.getModel('appointment'), attributes: ['id', 'startTime', 'endTime', 'status'] },
      { model: sequelize.modelManager.getModel('branch'), attributes: ['id', 'name', 'managerId'] },
      { model: sequelize.modelManager.getModel("user"), attributes: ['id', 'fname', 'lname', 'phone', 'email', 'userType'] },
      { model: sequelize.modelManager.getModel("patient"), attributes: ['id', 'fname', 'lname', 'phone', 'email'] },
    ];

    if (reqData.id) {
      callFunction = "findOne";
      query.where.id = reqData.id;
    }

    if (reqData.status) {
      query.where.status = reqData.status?.toUpperCase()
    }

    if (reqData.appointmentId) {
      query.where.appointmentId = reqData.appointmentId;
    }

    if (reqData.patientId) {
      callFunction = "findAndCountAll";
      query.where.patientId = reqData.patientId;
    }

    if (reqData.branchId) {
      callFunction = "findAndCountAll";
      query.where.branchId = reqData.branchId;
    }

    if (reqData.doctorId) {
      callFunction = "findAndCountAll";
      query.where.doctorId = reqData.doctorId;
    }

    if (reqData.userId) {
      callFunction = "findAndCountAll";
      query.where.userId = reqData.userId;
    }

    if (_.isEmpty(reqData)) {
      delete query.where;
      callFunction = "findAndCountAll";
    }

    return { callFunction, query };
  }

  // ----------------------------END-VISIT-----------------------------------------------


  // ----------------------------SERVICE-------------------------------------------------
  static async SAVE_SERVICE(req) { }

  static async LIST_SERVICE(req, skipPaging) {
    let query = {};
    const reqData = req.query;
    let callFunction = "findAndCountAll";

    query.where = {};
    query.order = [['createdAt', 'DESC']]

    if (reqData.id) {
      callFunction = "findOne"
      query.where.id = reqData.id
    }

    if (reqData.name) {
      query.where.name = reqData.name
    }

    return { callFunction, query }
  }

  static async UPDATE_SERVICE(req) {
    let db_qery = `UPDATE service SET description='${req.body.description}' where id=${req.params.id};`;
    const [metadata] = await sequelize.query(db_qery);
    return metadata;
  }

  static async DELETE_SERVICE(req) {
    const reqData = req.params;

    let db_qery = `DELETE FROM service WHERE id=${reqData.id};`;
    const [metadata] = await sequelize.query(db_qery);
    return [metadata];
  }

  // ----------------------------END-SERVICE-----------------------------------------------

  // ----------------------------USER-----------------------------------------------
  static async USER_LIST(req) {
    let query = {};
    const reqData = req.query;
    let callFunction = "findAndCountAll";

    query.where = {};
    query.order = [['createdAt', 'DESC']]


    query.include = [
      { model: sequelize.modelManager.getModel("location") },
    ];

    // query.include = [
    //   // { model: sequelize.modelManager.getModel('userLocation'), attributes: ['id', 'country', 'province', 'district', 'sector', 'cell', 'village'] },
    //   { model: sequelize.modelManager.getModel('branch'), attributes: ['id', 'name', 'managerId'] },
    // ];

    if (reqData.id) {
      callFunction = "findOne";
      query.where.id = reqData.id;
    }

    return { callFunction, query }
  }

  static async PATIENT_LIST(req) {
    let query = {};
    const reqData = req.query;
    let callFunction = "findAndCountAll";

    query.where = {};
    query.order = [['createdAt', 'DESC']]

    query.include = { all: true }

    if (reqData.id) {
      callFunction = "findOne";
      query.where.id = reqData.id;
    }

    return { callFunction, query }
  }

  static async LIST_APPOINTMENT(req) {
    let query = {};

    const reqData = req.query;
    let callFunction = "findOne";

    query.where = {};
    query.order = [['createdAt', 'DESC']]

    query.include = { all: true }

    if (req.user.userType === PRIVILAGES.ADMIN.VALUE || req.user.userType === PRIVILAGES.SUPER_ADMIN.VALUE) {
      callFunction = "findAndCountAll"

    } else {
      callFunction = "findAndCountAll"
      query.where.branchId = req.user.branchId;
    }

    if (reqData.id) {
      callFunction = "findOne"
      query.where.id = reqData.id
    }

    if (reqData.patientId) {
      query.where.patientId = reqData.patientId;
    }

    if (reqData.status) {
      query.where.status = reqData.status;
    }

    return { callFunction, query };
  }

  static async LIST_PAYMENT(req) {
    let query = {};
    const reqData = req.query;
    let callFunction = "findAndCountAll";

    query.where = {};
    query.order = [['createdAt', 'DESC']]

    query.include = { all: true }

    if (reqData.id) {
      callFunction = "findOne";
      query.where.id = reqData.id;
    }

    if (reqData.patientId) {
      query.where.patientId = reqData.patientId
    }

    if (reqData.visitId) {
      query.where.visitId = reqData.visitId
    }

    // if (reqData.daily) {
    //   query.where.visitId = reqData.visitId
    // }

    // if (reqData.period) {
    //   callFunction = "findAndCountAll";
    //   // query.where.visitId = reqData.visitId
    //   query.where.createdAt = { [Op.gt] : moment().subtract(7, 'days').toDate()}
    // }

    return { callFunction, query }
  }

  static async GALLERY(req) {
    let query = {};
    const reqData = req.query;
    let callFunction = "findAndCountAll";

    query.where = {};
    query.order = [['createdAt', 'DESC']]
    query.attributes = ['id', 'album', ['image', 'original'], 'thumbnail', 'redirect', 'uploadedBy', 'createdAt', 'updatedAt']

    query.include = { all: true }

    if (reqData.id) {
      callFunction = "findOne";
      query.where.id = reqData.id;
    }

    if (reqData.album) {
      query.where.album = reqData.album
    }

    if (reqData.uploadedBy) {
      query.where.uploadedBy = reqData.uploadedBy
    }

    return { callFunction, query }
  }
}

module.exports = QueryBuilder;
