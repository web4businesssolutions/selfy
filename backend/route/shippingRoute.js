const express = require("express");
const router = express.Router();
const {
  getShippings,
  addShipping,
  updateShipping,
  deleteShipping
} = require("../controller/shippingController");

router.get("/all", getShippings);
router.post("/add", addShipping);
router.put("/update/:id", updateShipping);
router.delete("/delete/:id", deleteShipping);

module.exports = router;
