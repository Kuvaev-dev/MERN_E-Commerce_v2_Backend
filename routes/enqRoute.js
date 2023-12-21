const express = require("express");
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getSingleEnquiry,
  getAllEnquiries,
} = require("../controllers/enqController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);
router.get("/:id", getSingleEnquiry);
router.get("/", getAllEnquiries);

module.exports = router;