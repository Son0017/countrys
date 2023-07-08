import { Op } from "sequelize";
import Country from "../models/country.model.js";
import db from "../connection/dbConnection.js";
import axios from "axios";
// import { Json } from "sequelize/types/utils.js";

let func = async (req, res) => {
  try {
    const responce = await axios("https://restcountries.com/v3.1/all");

    let newDate = await responce.data;
    let newArray = newDate.map((i) => {
      return {
        name_common: i["name"]["common"],
        name_official: i["name"]["official"],
        native_name: i["name"].nativeName
          ? Object.values(i["name"].nativeName)
          : null,
        alpha: {
          cca2: i["cca2"] ? i["cca2"] : null,
          ccn3: i.ccn3 ? i.ccn3 : null,
          cca3: i.cca3 ? i.cca3 : null,
          cioc: i.cioc ? i.cioc : null,
        },
        population: i["population"],
        region: i["region"],
        sub_region: i["subregion"],
        capital: i["capital"],
        top_level_domain: i["tld"],
        currencies: i["currencies"]
          ? Object.keys(i["currencies"]).map((j) => ({
              ...i["currencies"][j],
              shortName: j,
            }))
          : null,
        language: i["languages"] ? Object.values(i["languages"]) : null,
        borders: i["borders"],
        flag: i["flags"]["png"],
      };
    });

    await Country.bulkCreate(newArray);

    res.send({ data: newArray });
  } catch (error) {
    console.log(1);
    res.status(400).send(error.message);
  }
};

let getAll = async (req, res) => {
  try {
    let { limit, skip } = req.query;
    limit = limit ? limit : 30;
    let offset = skip ? skip : 0;
    let data = await Country.findAll({ limit, offset });
    const count = await Country.count();
    res.send({
      data,
      total: count * 1,
      skip: offset * 1,
      limit: limit * 1,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
};

let getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const oneData = await Country.findOne({
      where: {
        id,
      },
    });
    res.send(oneData);
  } catch (error) {
    res.send({ message: error.message, data: null });
  }
};

let getAlphaCode = async (req, res) => {
  try {
    const { alpha } = req.params;
    let code = alpha.toUpperCase();
    const data = await Country.findAll({
      where: {
        [Op.or]: [
          {
            alpha: { cioc: code },
          },
          {
            alpha: { cca2: code },
          },
          {
            alpha: { ccn3: code },
          },
          {
            alpha: { cca3: code },
          },
        ],
      },
    });
    res.send({ data });
  } catch (error) {
    res.send({ message: error.message });
  }
};

let getCountryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const data = await Country.findAll({
      where: db.where(db.fn("lower", db.col("name_common")), {
        [Op.iLike]: `%${name.toLowerCase()}%`,
      }),
    });

    res.send({ data });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

let getCountriesByRegion = async (req, res) => {
  try {
    let { region } = req.params;
    let { limit, skip } = req.query;
    limit = limit ? limit : 30;
    let offset = skip ? skip : 0;
    const data = await Country.findAll({
      where: db.where(db.fn("lower", db.col("region")), db.fn("lower", region)),
      limit,
      offset,
    });
    const count = await Country.count({
      where: db.where(db.fn("lower", db.col("region")), db.fn("lower", region)),
    });
    res.send({ data, total: count * 1, skip: offset * 1, limit: limit * 1 });
  } catch (error) {}
};

let updateOneCountry = async (req, res) => {
  try {
    const {
      name_common,
      name_official,
      native_name,
      alpha,
      population,
      region,
      sub_region,
      capital,
      top_level_domain,
      currencies,
      language,
      borders,
      flag,
    } = req.body;

    await Country.update({
      name_common,
      name_official,
      native_name,
      alpha,
      population,
      region,
      sub_region,
      capital,
      top_level_domain,
      currencies,
      language,
      borders,
      flag,
    });

    res.send({ message: yangilandi });
  } catch (error) {
    res.send({ message: error.message });
  }
};
export {
  func,
  getAll,
  getOne,
  getAlphaCode,
  updateOneCountry,
  getCountryByName,
  getCountriesByRegion,
};

// https://www.google.com/search?q=selena+gomez+calm+down+lyrics&oq=sele&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg5MgYIARBFGDsyBggCEEUYOzIKCAMQLhixAxiABDIZCAQQLhiDARivARjHARixAxiABBiYBRiZBTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPdIBCDMyMzhqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8
