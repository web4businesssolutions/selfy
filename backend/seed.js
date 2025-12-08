const mongoose = require('mongoose');
const User = require('./model/User');
const ProductDetail = require('./model/productDtails');
const Order = require('./model/order');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Order.deleteMany({});
        await ProductDetail.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data');

        // Create users
        const admin = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin'
        });

        const seller = new User({
            name: 'Seller User',
            email: 'seller@example.com',
            password: 'seller123',
            role: 'seller'
        });

        const customer = new User({
            name: 'Customer User',
            email: 'customer@example.com',
            password: 'customer123',
            role: 'customer'
        });

        await admin.save();
        await seller.save();
        await customer.save();
        console.log('Created users');

        // Create products
        const product1 = new ProductDetail({
            seller: seller._id,
            category: 'Makeup',
            brandName: 'Brand X',
            name: 'Lipstick',
            description: 'Beautiful red lipstick',
            bulletPoints: ['Long lasting', 'Rich color', 'Moisturizing'],
            images: ['/uploads/1750938543557.webp'],
            price: 500,
            quantity: 100,
            itemCondition: 'New'
        });

        const product2 = new ProductDetail({
            seller: seller._id,
            category: 'Skincare',
            brandName: 'Brand Y',
            name: 'Moisturizer',
            description: 'Hydrating face cream',
            bulletPoints: ['For all skin types', 'SPF 30', 'Cruelty free'],
            images: ['/uploads/1751964570283-WhatsApp Image 2025-05-30 at 11.21.18 AM.jpeg'],
            price: 800,
            quantity: 50,
            itemCondition: 'New'
        });

        const product3 = new ProductDetail({
            seller: seller._id,
            category: 'Makeup',
            brandName: 'Brand A',
            name: 'Eyeshadow Palette',
            description: '12-color eyeshadow palette',
            bulletPoints: ['Professional quality', 'Long lasting', 'Easy to blend'],
            images: ['/uploads/1751225955998.webp'],
            price: 1200,
            quantity: 30,
            itemCondition: 'New'
        });

        const product4 = new ProductDetail({
            seller: seller._id,
            category: 'Hair Care',
            brandName: 'Brand B',
            name: 'Shampoo',
            description: 'Organic herbal shampoo',
            bulletPoints: ['Organic ingredients', 'Gentle on scalp', 'Sulfate free'],
            images: ['/uploads/1751964498193-makeup20.jpeg'],
            price: 450,
            quantity: 75,
            itemCondition: 'New'
        });

        const product5 = new ProductDetail({
            seller: seller._id,
            category: 'Fragrance',
            brandName: 'Brand C',
            name: 'Perfume',
            description: 'Luxury floral perfume',
            bulletPoints: ['Long lasting fragrance', 'Elegant scent', 'Alcohol free'],
            images: ['/uploads/1750937330565.webp'],
            price: 2000,
            quantity: 15,
            itemCondition: 'New'
        });

        const product6 = new ProductDetail({
            seller: seller._id,
            category: 'Nails',
            brandName: 'Brand D',
            name: 'Nail Polish Set',
            description: '12-piece nail polish collection',
            bulletPoints: ['Quick dry formula', 'Chip resistant', 'Vegan'],
            images: ['/uploads/1751967312937-WhatsApp Image 2025-05-30 at 11.21.21 AM.jpeg'],
            price: 800,
            quantity: 40,
            itemCondition: 'New'
        });

        const product7 = new ProductDetail({
            seller: seller._id,
            category: 'Makeup',
            brandName: 'Brand E',
            name: 'Foundation',
            description: 'Liquid foundation with SPF 15',
            bulletPoints: ['Full coverage', 'Non-comedogenic', 'Oil-free formula'],
            images: ['/uploads/1750938543557.webp'],
            price: 650,
            quantity: 55,
            itemCondition: 'New'
        });

        const product8 = new ProductDetail({
            seller: seller._id,
            category: 'Makeup',
            brandName: 'Brand F',
            name: 'Mascara',
            description: 'Waterproof volumizing mascara',
            bulletPoints: ['Long-lasting', 'Waterproof', 'Buildable formula'],
            images: ['/uploads/1751225955998.webp'],
            price: 350,
            quantity: 80,
            itemCondition: 'New'
        });

        const product9 = new ProductDetail({
            seller: seller._id,
            category: 'Skincare',
            brandName: 'Brand G',
            name: 'Cleansing Foam',
            description: 'Gentle daily cleanser',
            bulletPoints: ['Soap-free', 'Hypoallergenic', 'Suitable for sensitive skin'],
            images: ['/uploads/1751964570283-WhatsApp Image 2025-05-30 at 11.21.18 AM.jpeg'],
            price: 280,
            quantity: 90,
            itemCondition: 'New'
        });

        const product10 = new ProductDetail({
            seller: seller._id,
            category: 'Hair Care',
            brandName: 'Brand H',
            name: 'Hair Oil',
            description: 'Argan oil hair treatment',
            bulletPoints: ['Nourishes scalp', 'Promotes hair growth', '100% natural'],
            images: ['/uploads/1751964498193-makeup20.jpeg'],
            price: 520,
            quantity: 65,
            itemCondition: 'New'
        });

        const product11 = new ProductDetail({
            seller: seller._id,
            category: 'Fragrance',
            brandName: 'Brand I',
            name: 'Body Mist',
            description: 'Light floral body spray',
            bulletPoints: ['Long-lasting fragrance', 'Alcohol-free', 'Refreshing scent'],
            images: ['/uploads/1750937330565.webp'],
            price: 300,
            quantity: 100,
            itemCondition: 'New'
        });

        const product12 = new ProductDetail({
            seller: seller._id,
            category: 'Nails',
            brandName: 'Brand J',
            name: 'Cuticle Oil',
            description: 'Nourishing cuticle care oil',
            bulletPoints: ['Vitamin E rich', 'Promotes healthy nails', 'Quick absorption'],
            images: ['/uploads/1751967312937-WhatsApp Image 2025-05-30 at 11.21.21 AM.jpeg'],
            price: 200,
            quantity: 75,
            itemCondition: 'New'
        });

        await product1.save();
        await product2.save();
        await product3.save();
        await product4.save();
        await product5.save();
        await product6.save();
        await product7.save();
        await product8.save();
        await product9.save();
        await product10.save();
        await product11.save();
        await product12.save();
        console.log('Created products');

        // Create orders
        const order1 = new Order({
            user: customer._id,
            items: [
                {
                    product: product1._id,
                    quantity: 2,
                    seller: seller._id
                }
            ],
            totalAmount: 1076, // 500 * 2 + GST (18%) + shipping
            status: 'Placed',
            paymentMethod: 'COD',
            shippingAddress: {
                fullName: 'Customer User',
                address: '123 Main Street, City, State - 123456',
                city: 'City',
                postalCode: '123456',
                country: 'India',
                phone: '9876543210'
            }
        });

        const order2 = new Order({
            user: customer._id,
            items: [
                {
                    product: product1._id,
                    quantity: 1,
                    seller: seller._id
                },
                {
                    product: product2._id,
                    quantity: 1,
                    seller: seller._id
                }
            ],
            totalAmount: 1458, // (500 + 800) + GST + shipping
            status: 'Processing',
            paymentMethod: 'Card',
            isPaid: true,
            shippingAddress: {
                fullName: 'Customer User',
                address: '456 Second Street, City, State - 123456',
                city: 'City',
                postalCode: '123456',
                country: 'India',
                phone: '9876543210'
            }
        });

        await order1.save();
        await order2.save();
        console.log('Created orders');

        console.log('Database seeded successfully!');
        console.log(`Created: 3 users, 12 products, 2 orders`);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

seedDatabase();
