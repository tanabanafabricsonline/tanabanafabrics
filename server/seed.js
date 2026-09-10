const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const dns = require('dns');

// Configure DNS fallback for MongoDB Atlas SRV lookup on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore DNS set errors if restricted
}

dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Collection = require('./models/Collection');
const Coupon = require('./models/Coupon');
const Banner = require('./models/Banner');

const MONGODB_URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB Atlas for seeding...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Collection.deleteMany({});
    await Coupon.deleteMany({});
    await Banner.deleteMany({});

    console.log('Cleared existing database records.');

    // 1. Create Admin User
    const adminPasswordHash = await bcrypt.hash('admin123456', 10);
    const adminUser = await User.create({
      name: 'Tanabana Admin',
      email: 'admin@tanabana.com',
      phone: '+923254588421',
      passwordHash: adminPasswordHash,
      role: 'admin',
      isActive: true
    });
    console.log(`Created Admin User: ${adminUser.email}`);

    // Create Sample Customer User
    const customerPasswordHash = await bcrypt.hash('customer123456', 10);
    const customerUser = await User.create({
      name: 'Ayesha Khan',
      email: 'customer@tanabana.com',
      phone: '+923009876543',
      passwordHash: customerPasswordHash,
      role: 'customer',
      isActive: true
    });
    console.log(`Created Customer User: ${customerUser.email}`);

    // 2. Create Categories
    const categories = await Category.insertMany([
      {
        name: 'Unstitched',
        slug: 'unstitched',
        description: 'Premium unstitched luxury fabrics with hand embroidered dupattas.',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
        gender: 'Women'
      },
      {
        name: 'Stitched Pret',
        slug: 'stitched-pret',
        description: 'Ready-to-wear luxury pret handcrafted for elegance.',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
        gender: 'Women'
      },
      {
        name: 'Silk Collection',
        slug: 'silk-collection',
        description: '100% Pure Raw Silk suits with intricate zari embellishments.',
        image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
        gender: 'Women'
      },
      {
        name: 'Festive Velvet',
        slug: 'festive-velvet',
        description: 'Micro velvet 9000 suits designed for weddings and winter celebrations.',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
        gender: 'Women'
      }
    ]);
    console.log(`Seeded ${categories.length} categories.`);

    // 3. Create Collections
    const collections = await Collection.insertMany([
      {
        name: 'Velvet Royale 2026',
        slug: 'velvet-royale-2026',
        description: 'Opulent velvet ensembles featuring deep tones, sequins, and royal threadwork.',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
        featured: true
      },
      {
        name: 'Summer Lawn Luxe',
        slug: 'summer-lawn-luxe',
        description: 'Breathable Swiss Lawn digital prints with chiffon & organza embroidered borders.',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
        featured: true
      },
      {
        name: 'Heritage Silk',
        slug: 'heritage-silk',
        description: 'Timeless pure silk heirlooms tailored for traditional royal aesthetics.',
        image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
        featured: true
      }
    ]);
    console.log(`Seeded ${collections.length} collections.`);

    // 4. Create Products
    const products = await Product.insertMany([
      {
        name: 'Emerald Noor Unstitched 3-Piece Silk',
        slug: 'emerald-noor-unstitched-3-piece-silk',
        description: 'Exquisite deep emerald green raw silk shirt with handcrafted gold dabka embroidery. Accompanied by pure organza embroidered dupatta and silk trousers.',
        category: 'Silk Collection',
        subcategory: '3 Piece',
        collectionName: 'Heritage Silk',
        gender: 'Women',
        price: 24500,
        salePrice: 19999,
        sku: 'TN-SLK-001',
        fabric: 'Raw Silk',
        color: 'Emerald Green',
        colors: ['Emerald Green', 'Deep Maroon'],
        stock: 15,
        images: [
          'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop'
        ],
        featured: true,
        newArrival: true,
        isActive: true,
        tags: ['Luxury', 'Silk', 'Unstitched', 'Wedding'],
        seo: {
          title: 'Emerald Noor 3-Piece Silk | Tanabana Fabrics',
          description: 'Shop luxury emerald green raw silk 3-piece suit with organza embroidered dupatta at Tanabana Fabrics.'
        }
      },
      {
        name: 'Royal Sapphire Velvet Festive Pret',
        slug: 'royal-sapphire-velvet-festive-pret',
        description: 'Heavy micro-velvet 9000 kurti featuring zardozi hand embroidery on neck and sleeves, paired with metallic foil printed crushed silk sharara.',
        category: 'Festive Velvet',
        subcategory: 'Ready To Wear',
        collectionName: 'Velvet Royale 2026',
        gender: 'Women',
        price: 32000,
        salePrice: 27500,
        sku: 'TN-VLV-002',
        fabric: 'Micro Velvet 9000',
        color: 'Royal Blue',
        colors: ['Royal Blue', 'Plum Wine'],
        stock: 8,
        images: [
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop'
        ],
        featured: true,
        newArrival: true,
        isActive: true,
        tags: ['Velvet', 'Pret', 'Festive', 'Party Wear'],
        seo: {
          title: 'Royal Sapphire Velvet Pret | Tanabana Fabrics',
          description: 'Buy Royal Sapphire Velvet Festive Pret online with Cash on Delivery across Pakistan.'
        }
      },
      {
        name: 'Gul-e-Rana Lawn Print 3-Piece',
        slug: 'gul-e-rana-lawn-print-3-piece',
        description: 'Premium Pima Lawn shirt with floral digital print, embroidered patch border, and jacquard net dupatta.',
        category: 'Unstitched',
        subcategory: 'Lawn',
        collectionName: 'Summer Lawn Luxe',
        gender: 'Women',
        price: 8950,
        salePrice: 6999,
        sku: 'TN-LWN-003',
        fabric: 'Pima Lawn',
        color: 'Soft Blush Pink',
        colors: ['Soft Blush Pink', 'Mint Teal'],
        stock: 25,
        images: [
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop'
        ],
        featured: false,
        newArrival: true,
        isActive: true,
        tags: ['Lawn', 'Summer', 'Unstitched', 'Daily Wear'],
        seo: {
          title: 'Gul-e-Rana Lawn Print 3-Piece | Tanabana Fabrics',
          description: 'Shop premium lawn unstitched suits with net dupatta.'
        }
      },
      {
        name: 'Maharani Chiffon Embroidered Dupatta Suit',
        slug: 'maharani-chiffon-embroidered-dupatta-suit',
        description: 'Graceful ivory chiffon shirt embellished with pearls, tilla threadwork, accompanied by tissue silk trousers.',
        category: 'Stitched Pret',
        subcategory: 'Chiffon',
        collectionName: 'Heritage Silk',
        gender: 'Women',
        price: 18500,
        salePrice: 15999,
        sku: 'TN-CHF-004',
        fabric: 'Pure Chiffon',
        color: 'Ivory Gold',
        colors: ['Ivory Gold'],
        stock: 12,
        images: [
          'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop'
        ],
        featured: true,
        newArrival: false,
        isActive: true,
        tags: ['Chiffon', 'Pret', 'Luxury'],
        seo: {
          title: 'Maharani Chiffon Suit | Tanabana Fabrics',
          description: 'Order ivory chiffon embroidered pret suit with free delivery.'
        }
      }
    ]);
    console.log(`Seeded ${products.length} products.`);

    // 5. Create Coupons
    const coupons = await Coupon.insertMany([
      {
        code: 'WELCOME10',
        discountType: 'percentage',
        discountValue: 10,
        minimumOrder: 5000,
        maximumDiscount: 2000,
        usageLimit: 100,
        expiryDate: new Date('2027-12-31'),
        isActive: true
      },
      {
        code: 'TANABANA1000',
        discountType: 'fixed',
        discountValue: 1000,
        minimumOrder: 15000,
        usageLimit: 50,
        expiryDate: new Date('2027-12-31'),
        isActive: true
      }
    ]);
    console.log(`Seeded ${coupons.length} coupons.`);

    // 6. Create Banners
    const banners = await Banner.insertMany([
      {
        title: 'Velvet Royale 2026 Collection',
        subtitle: 'Opulent Textures & Timeless Royal Craftsmanship',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1600&auto=format&fit=crop',
        buttonText: 'Explore Collection',
        buttonLink: '/collections/velvet-royale-2026',
        position: 1,
        isActive: true
      },
      {
        title: 'Pure Heritage Silk Editions',
        subtitle: 'Handcrafted Zari & Dabka Embroidery for Modern Royalty',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1600&auto=format&fit=crop',
        buttonText: 'Shop Silk Suits',
        buttonLink: '/category/silk-collection',
        position: 2,
        isActive: true
      }
    ]);
    console.log(`Seeded ${banners.length} banners.`);

    console.log('\n🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
