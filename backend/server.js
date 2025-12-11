const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const authRoutes = require('./route/authRoute');
const productRoute = require('./route/productRoute');
const cartRoutes = require('./route/cart');
const orderRoutes = require('./route/order');
const adminRoutes = require('./route/admin');
const categoryRoutes = require("./route/categoryRoutes");
const uploadRoutes = require('./route/upload')
const productDetailRoutes = require('./route/productDetailRoute')
const userRoutes = require('./route/userRoute');
const aboutRoutes = require('./route/aboutRoute');
const contactRoutes = require('./route/contactRoute');
const termRoutes = require('./route/termRoute');
const privacyRoutes = require('./route/privacyRoute');
const returnRoutes = require('./route/returnRoute');
const shippingRoutes = require('./route/shippingRoute');
const footerRoutes = require('./route/footerRoute');


const app = express();

// ✅ Enable CORS for frontend origin
     const allowedOrigins = [
                    'https://selfysnap.com',
                    'https://www.selfysnap.com'
                ];

                app.use((req, res, next) => {
                    const origin = req.headers.origin;
                    if (allowedOrigins.includes(origin)) {
                        res.header('Access-Control-Allow-Origin', origin);
                        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
                        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
                        res.header('Access-Control-Allow-Credentials', 'true');
                    }
                    if (req.method === 'OPTIONS') {
                        return res.sendStatus(204);
                    }
                    next();
                });
    credentials: true,
}));

// app.use(cors({
//       // origin: 'https://selfy-snap-1-7kn9.onrender.com',
//     origin: 'https://www.selfysnap.com',

//     credentials: true,
// }));

app.use(express.json());

app.use('/api/upload', uploadRoutes);


// ✅ Serve static uploads folder
app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'), {
        setHeaders: (res) => {
            res.setHeader('Access-Control-Allow-Origin', '*'); // Allow access from any origin
        }
    })
);

app.use(express.urlencoded({ extended: true }));

//health check
// --- Global error handler for CORS failures ---
app.use((err, req, res, next) => {
    if (err && err.name === 'CorsError') {
        return res.status(403).json({ error: 'CORS Error: Not allowed by CORS' });
    }
    next(err);
});
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/productdetail', productDetailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/terms', termRoutes);
app.use('/api/privacys', privacyRoutes);
app.use('/api/returns', returnRoutes);
app.use('/api/shippings', shippingRoutes);
app.use('/api/footer', footerRoutes);



const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB is connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
