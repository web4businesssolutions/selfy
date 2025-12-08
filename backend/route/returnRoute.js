const express = require("express");
const router = express.Router();
const {
  getReturns,
  addReturn,
  updateReturn,
  deleteReturn
} = require("../controller/returnController");

router.get("/all", getReturns);
router.post("/add", addReturn);
router.put("/update/:id", updateReturn);
router.delete("/delete/:id", deleteReturn);

module.exports = router;
