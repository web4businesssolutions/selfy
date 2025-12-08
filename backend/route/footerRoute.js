const express = require("express");
const upload = require("../middleware/upload.js");
const { getFooter, createFooter, updateFooter, deleteFooter } = require("../controller/footerController");

const router = express.Router();

router.get("/all", getFooter);
router.post("/add", upload.single("logo"), createFooter);
router.put("/update/:id", upload.single("logo"), updateFooter);
router.delete("/delete/:id", deleteFooter);

module.exports = router;
 