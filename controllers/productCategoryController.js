const ProductCategory = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const { validateMongoDBid } = require("../utils/validateMongoDBid");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await ProductCategory.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDBid(id);
  try {
    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDBid(id);
  try {
    const deletedCategory = await ProductCategory.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDBid(id);
  try {
    const getCategory = await ProductCategory.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const getCategories = await ProductCategory.find();
    res.json(getCategories);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
  getAllCategories,
};
