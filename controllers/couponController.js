const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const { validateMongoDBid } = require("../utils/validateMongoDBid");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const getCoupons = await Coupon.find();
    res.json(getCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDBid(id);
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDBid(id);
    try {
      const deleteCoupon = await Coupon.findByIdAndDelete(id);
      res.json(deleteCoupon);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
};
