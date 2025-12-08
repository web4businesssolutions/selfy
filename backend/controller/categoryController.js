// const Category = require("../model/Category");
// const slugify = require("slugify");

// const createCategory = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const image = req.file?.filename;

//         if (!name) return res.status(400).json({ message: "Name is required" });

//         const existing = await Category.findOne({ name });
//         if (existing) return res.status(409).json({ message: "Category already exists" });

//         const category = await new Category({ name, slug: slugify(name), image }).save();
//         res.status(201).json({ success: true, category });
//     } catch (err) {
//         res.status(500).json({ message: "Error creating category", error: err.message });
//     }
// };


// const getAllCategories = async (req, res) => {
//     try {
//         const categories = await Category.find({});
//         res.status(200).json({ success: true, categories });
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching categories", error: err.message });
//     }
// };

// const updateCategory = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const { id } = req.params;
//         const image = req.file?.filename;

//         const updatedFields = { name, slug: slugify(name) };
//         if (image) updatedFields.image = image;

//         const updated = await Category.findByIdAndUpdate(id, updatedFields, { new: true });
//         res.status(200).json({ success: true, category: updated });
//     } catch (err) {
//         res.status(500).json({ message: "Error updating category", error: err.message });
//     }
// };


// const deleteCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Category.findByIdAndDelete(id);
//         res.status(200).json({ success: true, message: "Category deleted" });
//     } catch (err) {
//         res.status(500).json({ message: "Error deleting category", error: err.message });
//     }
// };

// module.exports = {
//     createCategory,
//     getAllCategories,
//     updateCategory,
//     deleteCategory
// };

const Category = require("../model/Category");
const slugify = require("slugify");

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file?.path; // ✅ Cloudinary image URL

        if (!name) return res.status(400).json({ message: "Name is required" });

        const existing = await Category.findOne({ name });
        if (existing) return res.status(409).json({ message: "Category already exists" });

        const category = await new Category({ name, slug: slugify(name), image }).save();
        res.status(201).json({ success: true, category });
    } catch (err) {
        res.status(500).json({ message: "Error creating category", error: err.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ message: "Error fetching categories", error: err.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const image = req.file?.path; // ✅ Cloudinary image URL

        const updatedFields = { name, slug: slugify(name) };
        if (image) updatedFields.image = image;

        const updated = await Category.findByIdAndUpdate(id, updatedFields, { new: true });
        res.status(200).json({ success: true, category: updated });
    } catch (err) {
        res.status(500).json({ message: "Error updating category", error: err.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting category", error: err.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};

