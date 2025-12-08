// import express from "express";
// import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../controller/categoryController.js";
// const router = express.Router();

// router.post("/create", createCategory);
// router.get("/all", getAllCategories);
// router.put("/update/:id", updateCategory);
// router.delete("/delete/:id", deleteCategory);

// export default router;


// backend/route/categoryRoutes.js or routes/categoryRoutes.js
const express = require("express");
const {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
} = require("../controller/categoryController");
const upload = require('../middleware/upload'); // use correct path

const router = express.Router();

router.post("/create", upload.single("image"), createCategory);
router.get("/all", getAllCategories);
router.put("/update/:id", upload.single("image"), updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router; // ✅ important
