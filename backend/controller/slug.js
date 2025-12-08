const express = require("express");
const router = express.Router();
const Category = require("../model/Category");
const Product = require("../model/product");

router.get("/category/:slug", async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const products = await Product.find({ category: category._id }).populate("category");
        res.status(200).json({ success: true, category, products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
