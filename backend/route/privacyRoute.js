const express = require("express");
const router = express.Router();
const {
  getPrivacys,
  addPrivacy,
  updatePrivacy,
  deletePrivacy
} = require("../controller/privacyController");

router.get("/all", getPrivacys);
router.post("/add", addPrivacy);
router.put("/update/:id", updatePrivacy);
router.delete("/delete/:id", deletePrivacy);

module.exports = router;
