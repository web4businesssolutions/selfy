const express = require("express");
const router = express.Router();
const {
  getTerms,
  addTerm,
  updateTerm,
  deleteTerm
} = require("../controller/termController");

router.get("/all", getTerms);
router.post("/add", addTerm);
router.put("/update/:id", updateTerm);
router.delete("/delete/:id", deleteTerm);

module.exports = router;
