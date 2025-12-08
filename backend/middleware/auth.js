// const jwt = require("jsonwebtoken");
// const User = require("../model/User");

// ✅ 1. isAuthenticated
// exports.isAuthenticated = async (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ error: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id).select("-password");

//         if (!user) return res.status(404).json({ error: "User not found" });

//         req.user = user;
//         next();
//     } catch (err) {
//         console.error("❌ Auth Error:", err.message);
//         return res.status(401).json({ error: "Invalid or expired token" });
//     }
// };





const jwt = require('jsonwebtoken');
const User = require('../model/User'); // Ensure correct path

exports.isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        if (!token || token === "null" || token === "undefined") {
            return res.status(401).json({ error: "Invalid token format" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user; // Attach full user object
        next();
    } catch (err) {
        console.error("❌ Auth Error:", err.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};


// ✅ 2. isAdmin
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied: Admins only" });
    }
    next();
};

// ✅ 3. isSeller
exports.isSeller = (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({ error: "Access denied: Sellers only" });
    }
    next();
};
