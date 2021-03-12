const CategoriesModel = require("../../models/categories/categories.model.js");

const {
  response200WithData,
  response500WithMessage,
} = require("../../helpers/expressRes.js");

const getAllCategories = async (req, res) => {
  try {
    const data = await CategoriesModel.getAllCategories();
    return response200WithData(res, data);
  } catch (e) {
    return response500WithMessage(res, "Oups ! error T_T");
  }
};

const getCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await CategoriesModel.getCategory(id);
    return response200WithData(res, data);
  } catch (e) {
    console.log(e);
    return response500WithMessage(res, "Oups ! error T_T");
  }
};

module.exports = { getAllCategories, getCategory };
