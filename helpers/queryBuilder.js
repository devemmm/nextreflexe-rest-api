const _ = require("lodash");
const mongoose = require("mongoose");
const { STATUS, NURSE_ATTENDANTS } = require("../libs/constants");
const sequelize = require("../config/database");
const { Op, BOOLEAN } = require("sequelize");

class QueryBuilder {
  static async BRANCH_LIST(req, skipPageLimit) {
    const reqData = req.query;

    let query = {};
    let callFunction = "findOne";

    query.where = {};
    query.include = [
      { model: sequelize.modelManager.getModel("branchLocation") },
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
            model: sequelize.modelManager.getModel("branchLocation"),
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

  static LIST_VISIT(req) {
    let query = {};
    const reqData = req.query;
    let callFunction = "findOne";

    query.where = {};

    if (reqData.id) {
      query.where.id = reqData.id;
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

  static async SAVE_SERVICE(req) {}

  static async LIST_SERVICE(req, skipPaging) {
    const reqData = req.query;

    let db_qery = "SELECT * FROM service;";
    if (reqData.id) {
      db_qery = `SELECT * FROM service WHERE id='${reqData.id}'`;
    }

    const [metadata] = await sequelize.query(db_qery);
    return metadata;
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

  static async USER_LIST(req) {
    const reqData = req.query;

    let db_qery =
      "SELECT user.id, user.fname, user.lname, user.nid, user.email, user.phone, user.dob, user.createdAt AS user_createdAt,  user.updatedAt AS user_updatedAt, user_location.country, user_location.province, user_location.district, user_location.sector, user_location.cell, user_location.village, user_location.createdAt AS location_createdAt, user_location.updatedAt AS location_updatedAt FROM user, user_location WHERE user.id = user_location.userId;";
    if (reqData.id) {
      db_qery = `SELECT user.id, user.fname, user.lname, user.nid, user.email, user.phone, user.dob, user.createdAt AS user_createdAt,  user.updatedAt AS user_updatedAt, user_location.country, user_location.province, user_location.district, user_location.sector, user_location.cell, user_location.village, user_location.createdAt AS location_createdAt, user_location.updatedAt AS location_updatedAt FROM user, user_location WHERE user.id = user_location.userId AND user.id='${reqData.id}';`;
    }

    const [metadata] = await sequelize.query(db_qery);

    return metadata;
  }

  static async PATIENT_LIST(req) {
    const reqData = req.query;

    let db_qery =
      "SELECT patient.id, patient.fname, patient.lname, patient.email, patient.phone, patient.dob, patient.nid, patient.diagnosis, patient.status, patient.createdAt, patient.updatedAt, patient_location.id AS location_id, patient_location.country, patient_location.province, patient_location.district, patient_location.sector, patient_location.cell, patient_location.village, patient_location.createdAt as location_createdAt, patient_location.updatedAt AS location_updatedAt, patient_location.branchId FROM  patient, patient_location WHERE patient.id = patient_location.patientId;";

    if (reqData.id) {
      db_qery = `SELECT patient.id, patient.fname, patient.lname, patient.email, patient.phone, patient.dob, patient.nid, patient.diagnosis, patient.status, patient.createdAt, patient.updatedAt, patient_location.id AS location_id, patient_location.country, patient_location.province, patient_location.district, patient_location.sector, patient_location.cell, patient_location.village, patient_location.createdAt as location_createdAt, patient_location.updatedAt AS location_updatedAt, patient_location.branchId FROM  patient, patient_location WHERE patient.id = patient_location.patientId AND patient.id ='${reqData.id}';`;
    }

    const [metadata] = await sequelize.query(db_qery);
    return metadata;
  }

  static async LIST_APPOINTMENT(req) {
    const reqData = req.query;

    let db_query = "SELECT * FROM appointment;";

    const [metadata] = await sequelize.query(db_query);

    const moment = require("moment");

    console.log(moment(metadata[0].createdAt).format("YYYY-MM-DD HH:mm:ss"));

    return metadata;
  }

  static async LIST_PAYMENT(req) {
    const reqData = req.query;

    let db_query = "SELECT * FROM payment;";

    const [metadata] = await sequelize.query(db_query);
    return metadata;
  }

  static serviceList(req, query, skipPageLimit = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields =
      "code name description status createdBy createdAt updatedAt";

    if (reqData.code) {
      query.where({ name: new RegExp(reqData.name, "i") });
    }

    if (reqData.name) {
      query.where({ name: reqData.name });
    }

    if (reqData.description) {
      query.where({ description: reqData.description });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.createdBy) {
      query.where({ createdBy: reqData.createdBy });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }

    query.select(selectFields);

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static healthFacilitiesList(req, query, skipPageLimit = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields =
      "name code locationCode province district sector cell village status category type updatedAt";

    if (reqData.name) {
      query.where({ name: new RegExp(reqData.name, "i") });
    }
    if (reqData.code) {
      query.where({ code: new RegExp(reqData.code, "i") });
    }
    if (reqData.locationCode) {
      query.where({ locationCode: new RegExp(reqData.locationCode, "i") });
    }
    if (reqData.status) {
      query.where({ status: reqData.status });
    }
    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }
    const selectedArray = selectFields.split(" ");
    if (_.includes(selectedArray, "province")) {
      query.populate("province");
    }
    if (_.includes(selectedArray, "district")) {
      query.populate("district");
    }
    if (_.includes(selectedArray, "sector")) {
      query.populate("sector");
    }
    if (_.includes(selectedArray, "cell")) {
      query.populate("cell");
    }
    if (_.includes(selectedArray, "village")) {
      query.populate("village");
    }

    query.select(selectFields);

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static nursesList(req, query, skipPageLimit = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields =
      "idType idNumber facilityId surName postNames dateOfBirth maritalStatus nationality domicileCountry domicileDistrict domicileProvince domicileSector domicileCell domicileVillage licenseNumber qualification updatedAt";

    if (reqData.idNumber) {
      query.where({ idNumber: new RegExp(reqData.idNumber, "i") });
    }

    if (reqData.surName) {
      query.where({
        $expr: {
          $regexMatch: {
            input: { $concat: ["$surName", " ", "$postNames"] },
            regex: reqData.surName,
            options: "i",
          },
        },
      });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.licenseNumber) {
      query.where({ licenseNumber: reqData.licenseNumber });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }

    query.select(selectFields);

    query.populate({
      path: "facilityId",
      select:
        "name code locationCode province district sector cell village status",
    });

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static diseasesList(req, query, skipPageLimit = false, isActiveList = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields = "shortTitle longTitle code chapter status updatedAt";

    if (reqData.shortTitle) {
      query.where({ shortTitle: new RegExp(reqData.shortTitle, "i") });
    }

    if (reqData.longTitle) {
      query.where({ longTitle: new RegExp(reqData.longTitle, "i") });
    }

    if (reqData.code) {
      query.where({ code: reqData.code });
    }

    if (reqData.chapter) {
      query.where({ chapter: reqData.chapter });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }

    if (reqData.search) {
      query.or({ shortTitle: new RegExp(reqData.search, "i") });
      query.or({ longTitle: new RegExp(reqData.search, "i") });
      query.or({ code: new RegExp(reqData.search, "i") });
      query.or({ chapter: new RegExp(reqData.search, "i") });
    }

    if (isActiveList) {
      reqData.page = 1;
      reqData.limit = 200;
      this.pagination(reqData, query);
      selectFields = "shortTitle longTitle code chapter";
    }
    query.select(selectFields);

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static mannerOfDeathsList(req, query, skipPageLimit = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields = "name status updatedAt";

    if (reqData.name) {
      query.where({ name: new RegExp(reqData.name, "i") });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }

    query.select(selectFields);

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static insurancesList(req, query, skipPageLimit = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields = "name type status updatedAt";

    if (reqData.name) {
      query.where({ name: new RegExp(reqData.name, "i") });
    }

    if (reqData.type) {
      query.where({ type: new RegExp(reqData.type, "i") });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }

    query.select(selectFields);

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static embassiesList(req, skipPageLimit = false) {
    const reqData = req.query;
    const limit = Number(
      reqData.limit ? reqData.limit : process.env.PAGE_LIMIT
    );
    const pageNo = Number(reqData.page ? limit * reqData.page - limit : 0);
    const match = { $match: { $and: [] } };
    const embassyMatch = { $match: {} };
    let selectFields = {
      name: 1,
      values: 1,
      status: 1,
      facilityId: 1,
      cityName: 1,
      associatedCountries: 1,
      facilities: 1,
      updatedAt: 1,
    };
    if (reqData.fields) {
      selectFields = reqData.fields.split(",");
      selectFields = selectFields.reduce(function (acc, curr) {
        acc[curr] = 1;
        return acc;
      }, {});
    }

    if (reqData.name) {
      embassyMatch.$match = { name: new RegExp(reqData.name, "i") };
    }

    if (reqData.values) {
      embassyMatch.$match = { values: new RegExp(reqData.values, "i") };
    }

    if (reqData.cityName) {
      embassyMatch.$match = { cityName: new RegExp(reqData.cityName, "i") };
    }

    if (reqData.associatedCountries) {
      embassyMatch.$match.associatedCountries = {
        $in: [reqData.associatedCountries],
      };
    }

    if (reqData.status) {
      embassyMatch.$match.status = { $eq: reqData.status };
    }

    if (reqData.facilityId) {
      embassyMatch.$match._id = {
        $eq: new mongoose.Types.ObjectId(reqData.facilityId),
      };
    }

    const pipeline = [{ $project: selectFields }];

    if (!_.isEmpty(embassyMatch.$match)) {
      pipeline.push(embassyMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }

    const sortField = reqData.sort ? reqData.sort : "createdAt";
    const order = reqData.order && reqData.order === "asc" ? 1 : -1;

    let resultArray = [{ $sort: { [`${sortField}`]: order } }];

    if (!skipPageLimit) {
      resultArray = [
        { $sort: { [`${sortField}`]: order } },
        { $skip: pageNo },
        { $limit: limit },
      ];
    }

    pipeline.push({
      $facet: {
        results: resultArray,
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });

    return pipeline;
  }

  static nursesAndAttendantsListByDocument(req, query) {
    const reqData = req.query;
    let selectFields = "";
    if (reqData.documentNumber) {
      query.where({ documentNumber: reqData.documentNumber });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    query.select(selectFields);

    return query;
  }

  static nursesAndAttendantsList(req, type, skipPageLimit = false) {
    const reqData = req.query;
    const limit = Number(
      reqData.limit ? reqData.limit : process.env.PAGE_LIMIT
    );
    const pageNo = Number(reqData.page ? limit * reqData.page - limit : 0);
    const match = { $match: { $and: [] } };
    const nurseMatch = { $match: {} };
    let selectFields = {
      documentType: 1,
      documentNumber: 1,
      facilityId: 1,
      surName: 1,
      postNames: 1,
      dateOfBirth: 1,
      dateOfDeath: 1,
      maritalStatus: 1,
      nationality: 1,
      domicileCountry: 1,
      domicileDistrict: 1,
      domicileProvince: 1,
      domicileSector: 1,
      domicileCell: 1,
      domicileVillage: 1,
      licenseNumber: 1,
      qualification: 1,
      facilities: 1,
      email: 1,
      phoneNumber: 1,
      status: 1,
      sex: 1,
      photo: 1,
      type: 1,
      createdAt: 1,
      updatedAt: 1,
    };
    if (reqData.fields) {
      selectFields = reqData.fields.split(",");
      selectFields = selectFields.reduce(function (acc, curr) {
        acc[curr] = 1;
        return acc;
      }, {});
    }

    if (reqData.surName) {
      nurseMatch.$match = {
        $expr: {
          $regexMatch: {
            input: { $concat: ["$surName", " ", "$postNames"] },
            regex: reqData.surName,
            options: "i",
          },
        },
      };
    }

    nurseMatch.$match.type = { $eq: type };

    if (reqData.documentNumber) {
      nurseMatch.$match.documentNumber = new RegExp(
        reqData.documentNumber,
        "i"
      );
    }

    if (reqData.licenseNumber) {
      nurseMatch.$match.licenseNumber = new RegExp(reqData.licenseNumber, "i");
    }

    if (reqData.status) {
      nurseMatch.$match.status = { $eq: reqData.status };
    }

    if (reqData.activeList) {
      // nurseMatch.$match.status = { $eq: STATUS.ACTIVE }
      match.$match.$and.push({
        $or: [
          { status: STATUS.ACTIVE },
          {
            status: STATUS.INACTIVE,
            dateOfDeath: {
              $gt: new Date(
                Date.now() - 1000 * 3600 * 24 * NURSE_ATTENDANTS.EXPIRY_DAYS
              ),
            },
          },
        ],
      });
    }

    if (reqData.facilityId) {
      nurseMatch.$match.facilityId = {
        $in: [new mongoose.Types.ObjectId(reqData.facilityId)],
      };
    }

    if (reqData.facilityName) {
      match.$match.$and.push({
        "facilities.name": new RegExp(reqData.facilityName, "i"),
      });
    }

    const pipeline = [
      {
        $lookup: {
          from: "health_facilities",
          let: { id: "$facilityId" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$id"] } } }],
          as: "facilities",
        },
      },
      { $project: selectFields },
    ];

    if (!_.isEmpty(nurseMatch.$match)) {
      pipeline.push(nurseMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }

    const sortField = reqData.sort ? reqData.sort : "createdAt";
    const order = reqData.order && reqData.order === "asc" ? 1 : -1;

    let resultArray = [{ $sort: { [`${sortField}`]: order } }];

    if (!skipPageLimit) {
      resultArray = [
        { $sort: { [`${sortField}`]: order } },
        { $skip: pageNo },
        { $limit: limit },
      ];
    }

    pipeline.push({
      $facet: {
        results: resultArray,
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });

    return pipeline;
  }

  static rolesList(req, query, skipPageLimit = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields = "name value role ministry status facilityType updatedAt";

    if (reqData.name) {
      query.where({ name: new RegExp(reqData.name, "i") });
    }

    if (reqData.facilityType) {
      query.where({ facilityType: reqData.facilityType });
    }

    if (reqData.role) {
      query.where({ role: reqData.role });
    }

    if (reqData.ministry) {
      query.where({ ministry: reqData.ministry });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }

    query.select(selectFields);

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static provincesList(req, query, skipPageLimit = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields = "name code status";

    if (reqData.name) {
      query.where({ name: new RegExp(reqData.name, "i") });
    }

    if (reqData.code) {
      query.where({ code: new RegExp(reqData.code, "i") });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }

    query.select(selectFields);

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static districtsList(req, skipPageLimit = false) {
    const reqData = req.query;
    const limit = Number(
      reqData.limit ? reqData.limit : process.env.PAGE_LIMIT
    );
    const pageNo = Number(reqData.page ? limit * reqData.page - limit : 0);
    const match = { $match: { $and: [] } };
    const districtMatch = { $match: {} };
    let selectFields = {
      name: 1,
      code: 1,
      status: 1,
      provinceId: 1,
      provinces: 1,
    };
    if (reqData.fields) {
      selectFields = reqData.fields.split(",");
      selectFields = selectFields.reduce(function (acc, curr) {
        acc[curr] = 1;
        return acc;
      }, {});
    }

    if (reqData.name) {
      districtMatch.$match = { name: new RegExp(reqData.name, "i") };
    }

    if (reqData.code) {
      districtMatch.$match = { code: new RegExp(reqData.code, "i") };
    }

    if (reqData.provinceId) {
      districtMatch.$match = { provinceId: reqData.provinceId };
    }

    if (reqData.status) {
      districtMatch.$match.status = { $eq: reqData.status };
    }

    if (reqData.provinceName) {
      match.$match.$and.push({
        "provinces.name": new RegExp(reqData.provinceName, "i"),
      });
    }

    if (reqData.provinceCode) {
      match.$match.$and.push({
        "provinces.code": new RegExp(reqData.provinceCode, "i"),
      });
    }

    const pipeline = [
      {
        $lookup: {
          from: "provinces",
          let: { id: { $toObjectId: "$provinceId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { name: 1, code: 1 } },
          ],
          as: "provinces",
        },
      },
      { $project: selectFields },
    ];

    if (!_.isEmpty(districtMatch.$match)) {
      pipeline.push(districtMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }

    const sortField = reqData.sort ? reqData.sort : "createdAt";
    const order = reqData.order && reqData.order === "asc" ? 1 : -1;

    let resultArray = [{ $sort: { [`${sortField}`]: order } }];

    if (!skipPageLimit) {
      resultArray = [
        { $sort: { [`${sortField}`]: order } },
        { $skip: pageNo },
        { $limit: limit },
      ];
    }

    pipeline.push({
      $facet: {
        results: resultArray,
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });

    return pipeline;
  }

  static districtById(id) {
    const match = { $match: { $and: [] } };
    const districtMatch = { $match: {} };
    const selectFields = {
      name: 1,
      code: 1,
      provinceId: 1,
      provinces: 1,
    };

    districtMatch.$match = { _id: new mongoose.Types.ObjectId(id) };

    const pipeline = [
      {
        $lookup: {
          from: "provinces",
          let: { id: { $toObjectId: "$provinceId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { name: 1, code: 1 } },
          ],
          as: "provinces",
        },
      },
      { $unwind: { path: "$provinces", preserveNullAndEmptyArrays: true } },
      { $project: selectFields },
    ];

    if (!_.isEmpty(districtMatch.$match)) {
      pipeline.push(districtMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }

    pipeline.push({
      $facet: {
        results: [{ $limit: 1 }],
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });

    return pipeline;
  }

  static sectorsList(req, skipPageLimit = false) {
    const reqData = req.query;
    const limit = Number(
      reqData.limit ? reqData.limit : process.env.PAGE_LIMIT
    );
    const pageNo = Number(reqData.page ? limit * reqData.page - limit : 0);
    const match = { $match: { $and: [] } };
    const sectorMatch = { $match: {} };
    let selectFields = {
      name: 1,
      code: 1,
      status: 1,
      districtId: 1,
      districts: 1,
    };
    if (reqData.fields) {
      selectFields = reqData.fields.split(",");
      selectFields = selectFields.reduce(function (acc, curr) {
        acc[curr] = 1;
        return acc;
      }, {});
    }

    if (reqData.name) {
      sectorMatch.$match = { name: new RegExp(reqData.name, "i") };
    }

    if (reqData.code) {
      sectorMatch.$match = { code: new RegExp(reqData.code, "i") };
    }

    if (reqData.districtId) {
      sectorMatch.$match = { districtId: reqData.districtId };
    }

    if (reqData.status) {
      sectorMatch.$match.status = { $eq: reqData.status };
    }

    if (reqData.districtName) {
      match.$match.$and.push({
        "districts.name": new RegExp(reqData.districtName, "i"),
      });
    }

    if (reqData.districtCode) {
      match.$match.$and.push({
        "districts.code": new RegExp(reqData.districtCode, "i"),
      });
    }

    const pipeline = [
      {
        $lookup: {
          from: "districts",
          let: { id: { $toObjectId: "$districtId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { name: 1, code: 1 } },
          ],
          as: "districts",
        },
      },
      { $project: selectFields },
    ];

    if (!_.isEmpty(sectorMatch.$match)) {
      pipeline.push(sectorMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }

    const sortField = reqData.sort ? reqData.sort : "createdAt";
    const order = reqData.order && reqData.order === "asc" ? 1 : -1;

    let resultArray = [{ $sort: { [`${sortField}`]: order } }];

    if (!skipPageLimit) {
      resultArray = [
        { $sort: { [`${sortField}`]: order } },
        { $skip: pageNo },
        { $limit: limit },
      ];
    }

    pipeline.push({
      $facet: {
        results: resultArray,
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });

    return pipeline;
  }

  static sectorById(id) {
    const match = { $match: { $and: [] } };
    const sectorMatch = { $match: {} };
    const selectFields = {
      name: 1,
      code: 1,
      districtId: 1,
      districts: 1,
    };

    sectorMatch.$match = { _id: new mongoose.Types.ObjectId(id) };

    const pipeline = [
      {
        $lookup: {
          from: "districts",
          let: { id: { $toObjectId: "$districtId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { name: 1, code: 1, provinceId: 1 } },
            {
              $lookup: {
                from: "provinces",
                let: { id: { $toObjectId: "$provinceId" } },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                  { $project: { name: 1, code: 1 } },
                ],
                as: "province",
              },
            },
            {
              $unwind: {
                path: "$province",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
          as: "districts",
        },
      },
      { $unwind: { path: "$districts", preserveNullAndEmptyArrays: true } },
      { $project: selectFields },
    ];

    if (!_.isEmpty(sectorMatch.$match)) {
      pipeline.push(sectorMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }

    pipeline.push({
      $facet: {
        results: [{ $limit: 1 }],
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });

    return pipeline;
  }

  static cellsList(req, skipPageLimit = false) {
    const reqData = req.query;
    const limit = Number(
      reqData.limit ? reqData.limit : process.env.PAGE_LIMIT
    );
    const pageNo = Number(reqData.page ? limit * reqData.page - limit : 0);
    const match = { $match: { $and: [] } };
    const cellMatch = { $match: {} };
    let selectFields = {
      name: 1,
      code: 1,
      status: 1,
      sectorId: 1,
      sectors: 1,
    };
    if (reqData.fields) {
      selectFields = reqData.fields.split(",");
      selectFields = selectFields.reduce(function (acc, curr) {
        acc[curr] = 1;
        return acc;
      }, {});
    }

    if (reqData.name) {
      cellMatch.$match = { name: new RegExp(reqData.name, "i") };
    }

    if (reqData.code) {
      cellMatch.$match = { code: new RegExp(reqData.code, "i") };
    }

    if (reqData.sectorId) {
      cellMatch.$match = { sectorId: reqData.sectorId };
    }

    if (reqData.status) {
      cellMatch.$match.status = { $eq: reqData.status };
    }

    if (reqData.sectorName) {
      match.$match.$and.push({
        "sectors.name": new RegExp(reqData.sectorName, "i"),
      });
    }

    if (reqData.sectorCode) {
      match.$match.$and.push({
        "sectors.code": new RegExp(reqData.sectorCode, "i"),
      });
    }

    const pipeline = [
      {
        $lookup: {
          from: "sectors",
          let: { id: { $toObjectId: "$sectorId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { name: 1, code: 1 } },
          ],
          as: "sectors",
        },
      },
      { $project: selectFields },
    ];

    if (!_.isEmpty(cellMatch.$match)) {
      pipeline.push(cellMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }

    const sortField = reqData.sort ? reqData.sort : "createdAt";
    const order = reqData.order && reqData.order === "asc" ? 1 : -1;

    let resultArray = [{ $sort: { [`${sortField}`]: order } }];

    if (!skipPageLimit) {
      resultArray = [
        { $sort: { [`${sortField}`]: order } },
        { $skip: pageNo },
        { $limit: limit },
      ];
    }

    pipeline.push({
      $facet: {
        results: resultArray,
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });

    return pipeline;
  }

  static cellById(id) {
    const match = { $match: { $and: [] } };
    const cellMatch = { $match: {} };
    const selectFields = {
      name: 1,
      code: 1,
      sectorId: 1,
      sectors: 1,
    };

    cellMatch.$match = { _id: new mongoose.Types.ObjectId(id) };

    const pipeline = [
      {
        $lookup: {
          from: "sectors",
          let: { id: { $toObjectId: "$sectorId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { name: 1, code: 1, districtId: 1 } },
            {
              $lookup: {
                from: "districts",
                let: { id: { $toObjectId: "$districtId" } },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                  { $project: { name: 1, code: 1, provinceId: 1 } },
                  {
                    $lookup: {
                      from: "provinces",
                      let: { id: { $toObjectId: "$provinceId" } },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { name: 1, code: 1 } },
                      ],
                      as: "province",
                    },
                  },
                  {
                    $unwind: {
                      path: "$province",
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                ],
                as: "district",
              },
            },
            {
              $unwind: {
                path: "$district",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
          as: "sectors",
        },
      },
      { $unwind: { path: "$sectors", preserveNullAndEmptyArrays: true } },
      { $project: selectFields },
    ];

    if (!_.isEmpty(cellMatch.$match)) {
      pipeline.push(cellMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }

    pipeline.push({
      $facet: {
        results: [{ $limit: 1 }],
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });

    return pipeline;
  }

  static villagesList(req, skipPageLimit = false) {
    const reqData = req.query;
    const limit = Number(
      reqData.limit ? reqData.limit : process.env.PAGE_LIMIT
    );
    const pageNo = Number(reqData.page ? limit * reqData.page - limit : 0);
    const match = { $match: { $and: [] } };
    const villageMatch = { $match: {} };
    let selectFields = {
      name: 1,
      code: 1,
      status: 1,
      cellId: 1,
      cells: 1,
    };
    if (reqData.fields) {
      selectFields = reqData.fields.split(",");
      selectFields = selectFields.reduce(function (acc, curr) {
        acc[curr] = 1;
        return acc;
      }, {});
    }

    if (reqData.name) {
      villageMatch.$match = { name: new RegExp(reqData.name, "i") };
    }

    if (reqData.code) {
      villageMatch.$match = { code: new RegExp(reqData.code, "i") };
    }

    if (reqData.cellId) {
      villageMatch.$match = { cellId: reqData.cellId };
    }

    if (reqData.status) {
      villageMatch.$match.status = { $eq: reqData.status };
    }

    if (reqData.cellName) {
      match.$match.$and.push({
        "cells.name": new RegExp(reqData.cellName, "i"),
      });
    }

    if (reqData.cellCode) {
      match.$match.$and.push({
        "cells.code": new RegExp(reqData.cellCode, "i"),
      });
    }

    const pipeline = [
      {
        $lookup: {
          from: "cells",
          let: { id: { $toObjectId: "$cellId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { name: 1, code: 1, sectorId: 1 } },
          ],
          as: "cells",
        },
      },
      { $project: selectFields },
    ];

    if (!_.isEmpty(villageMatch.$match)) {
      pipeline.push(villageMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }

    const sortField = reqData.sort ? reqData.sort : "createdAt";
    const order = reqData.order && reqData.order === "asc" ? 1 : -1;

    let resultArray = [{ $sort: { [`${sortField}`]: order } }];

    if (!skipPageLimit) {
      resultArray = [
        { $sort: { [`${sortField}`]: order } },
        { $skip: pageNo },
        { $limit: limit },
      ];
    }

    pipeline.push({
      $facet: {
        results: resultArray,
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });
    return pipeline;
  }

  static villageById(id) {
    const match = { $match: { $and: [] } };
    const villageMatch = { $match: {} };
    const selectFields = {
      name: 1,
      code: 1,
      cellId: 1,
      cells: 1,
    };

    villageMatch.$match = { _id: new mongoose.Types.ObjectId(id) };

    const pipeline = [
      {
        $lookup: {
          from: "cells",
          let: { id: { $toObjectId: "$cellId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
            { $project: { name: 1, code: 1, sectorId: 1 } },
            {
              $lookup: {
                from: "sectors",
                let: { id: { $toObjectId: "$sectorId" } },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                  { $project: { name: 1, code: 1, districtId: 1 } },
                  {
                    $lookup: {
                      from: "districts",
                      let: { id: { $toObjectId: "$districtId" } },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                        { $project: { name: 1, code: 1, provinceId: 1 } },
                        {
                          $lookup: {
                            from: "provinces",
                            let: { id: { $toObjectId: "$provinceId" } },
                            pipeline: [
                              { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
                              { $project: { name: 1, code: 1 } },
                            ],
                            as: "province",
                          },
                        },
                        {
                          $unwind: {
                            path: "$province",
                            preserveNullAndEmptyArrays: true,
                          },
                        },
                      ],
                      as: "district",
                    },
                  },
                  {
                    $unwind: {
                      path: "$district",
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                ],
                as: "sector",
              },
            },
            {
              $unwind: {
                path: "$sector",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
          as: "cells",
        },
      },
      { $unwind: { path: "$cells", preserveNullAndEmptyArrays: true } },
      { $project: selectFields },
    ];

    if (!_.isEmpty(villageMatch.$match)) {
      pipeline.push(villageMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }
    pipeline.push({
      $facet: {
        results: [{ $limit: 1 }],
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });

    return pipeline;
  }

  static professionsList(req, query, skipPageLimit = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields = "code name kinyarwandaName description status updatedAt";

    if (reqData.name) {
      query.where({ name: new RegExp(reqData.name, "i") });
    }

    if (reqData.code) {
      query.where({ code: new RegExp(reqData.code, "i") });
    }

    if (reqData.kinyarwandaName) {
      query.where({
        kinyarwandaName: new RegExp(reqData.kinyarwandaName, "i"),
      });
    }

    if (reqData.description) {
      query.where({ description: new RegExp(reqData.description, "i") });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }

    query.select(selectFields);

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static occupationsList(req, query, skipPageLimit = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields = "code name kinyarwandaName description status updatedAt";

    if (reqData.name) {
      query.where({ name: new RegExp(reqData.name, "i") });
    }

    if (reqData.code) {
      query.where({ code: new RegExp(reqData.code, "i") });
    }

    if (reqData.kinyarwandaName) {
      query.where({
        kinyarwandaName: new RegExp(reqData.kinyarwandaName, "i"),
      });
    }

    if (reqData.description) {
      query.where({ description: new RegExp(reqData.description, "i") });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }

    query.select(selectFields);

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static pagination(reqData, query) {
    const pageNo = reqData.page ? reqData.page : 1;
    const limit = reqData.limit ? reqData.limit : process.env.PAGE_LIMIT;
    const skip = (pageNo - 1) * limit;
    query.limit(Number(limit));
    query.skip(skip);

    return query;
  }

  static disabilityAreaList(req, query, skipPageLimit = false) {
    const reqData = req.query;
    let sortField = "-createdAt";
    let selectFields = "name period status updatedAt";

    if (reqData.name) {
      query.where({ name: new RegExp(reqData.name, "i") });
    }

    if (reqData.status) {
      query.where({ status: reqData.status });
    }

    if (reqData.fields) {
      selectFields = reqData.fields.split(",").join(" ");
    }

    if (reqData.sort) {
      sortField = reqData.sort;
    }

    query.select(selectFields);

    query.sort(sortField);

    if (!skipPageLimit) {
      this.pagination(reqData, query);
    }

    return query;
  }

  static disabilitySpecificList(req, skipPageLimit = false) {
    const reqData = req.query;
    const limit = Number(
      reqData.limit ? reqData.limit : process.env.PAGE_LIMIT
    );
    const pageNo = Number(reqData.page ? limit * reqData.page - limit : 0);
    const match = { $match: { $and: [] } };
    const specificMatch = { $match: {} };
    let selectFields = {
      name: 1,
      status: 1,
      disabilityAreaId: 1,
      disabilityArea: 1,
    };
    if (reqData.fields) {
      selectFields = reqData.fields.split(",");
      selectFields = selectFields.reduce(function (acc, curr) {
        acc[curr] = 1;
        return acc;
      }, {});
    }

    if (reqData.name) {
      specificMatch.$match = { name: new RegExp(reqData.name, "i") };
    }

    if (reqData.status) {
      specificMatch.$match.status = { $eq: reqData.status };
    }

    if (reqData.disabilityAreaId) {
      specificMatch.$match.disabilityAreaId = {
        $eq: new mongoose.Types.ObjectId(reqData.disabilityAreaId),
      };
    }

    const pipeline = [
      {
        $lookup: {
          from: "disability_areas",
          let: { id: "$disabilityAreaId" },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$id"] } } }],
          as: "disabilityArea",
        },
      },
      {
        $unwind: {
          path: "$disabilityArea",
        },
      },
      { $project: selectFields },
    ];

    if (!_.isEmpty(specificMatch.$match)) {
      pipeline.push(specificMatch);
    }

    if (!_.isEmpty(match.$match.$and)) {
      pipeline.push(match);
    }

    const sortField = reqData.sort ? reqData.sort : "createdAt";
    const order = reqData.order && reqData.order === "asc" ? 1 : -1;

    let resultArray = [{ $sort: { [`${sortField}`]: order } }];

    if (!skipPageLimit) {
      resultArray = [
        { $sort: { [`${sortField}`]: order } },
        { $skip: pageNo },
        { $limit: limit },
      ];
    }

    pipeline.push({
      $facet: {
        results: resultArray,
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    });

    return pipeline;
  }
}

module.exports = QueryBuilder;
