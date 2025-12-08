const express = require("express");
const router = express.Router();
const { createAbout, getAbout, updateAbout, deleteAbout } = require("../controller/aboutController");

const upload = require('../middleware/upload'); 

router.get("/all", getAbout);
router.post("/add", upload.single("image"), createAbout);
router.put("/update/:id", upload.single("image"), updateAbout);
router.delete("/delete/:id", deleteAbout);

module.exports = router; 