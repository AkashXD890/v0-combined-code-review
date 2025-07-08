# Yaddu's Network - Game Server Hosting Platform

A modern Node.js-based game server hosting platform with a focus on Minecraft servers, plugins, resources, and community features.

## 🚀 Features

- **Game Server Hosting**: Support for Minecraft, CS2, Rust, ARK, and 50+ games
- **Plugin Repository**: Browse, search, and purchase plugins
- **Resource Management**: Texture packs, builds, and templates
- **Server Ranks**: VIP rank system with exclusive perks
- **Mystery Crates**: Loot box system with rewards
- **Shopping Cart**: Full e-commerce functionality
- **Admin Panel**: Complete content management system
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **File Upload**: Multer for handling media uploads
- **Session Management**: Express-session
- **Styling**: Custom CSS with modern design patterns

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd nebula-pterodactyl-hosting
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create uploads directory**
   \`\`\`bash
   mkdir -p public/uploads
   \`\`\`

4. **Start the server**
   \`\`\`bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   \`\`\`

5. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
PORT=3000
SESSION_SECRET=your-secret-key-here
NODE_ENV=development
\`\`\`

### Admin Access

- **Admin Code**: `admin123`
- **Access Method**: Press `Ctrl+Shift+A` on any page or use the login form
- **Admin Panel**: Available at `/admin` after authentication

## 📁 Project Structure

\`\`\`
nebula-pterodactyl-hosting/
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── README.md                 # Project documentation
├── data.json                 # Data storage (auto-generated)
└── public/                   # Static files
    ├── index.html            # Homepage
    ├── plugins.html          # Plugins page
    ├── admin.html            # Admin panel
    ├── css/                  # Stylesheets
    │   ├── styles.css        # Main styles
    │   ├── components.css    # Component styles
    │   └── plugins.css       # Plugin-specific styles
    ├── js/                   # JavaScript files
    │   ├── main.js           # Main functionality
    │   ├── cart.js           # Shopping cart
    │   ├── admin.js          # Admin functions
    │   └── plugins.js        # Plugin management
    └── uploads/              # File uploads directory
\`\`\`

## 🎮 Features Overview

### Plugin System
- **Browse Plugins**: Search and filter through available plugins
- **Plugin Details**: Comprehensive information including screenshots, commands, permissions
- **Shopping Cart**: Add plugins to cart and checkout
- **File Management**: Upload plugin files, icons, and screenshots

### Admin Panel
- **Content Management**: Add, edit, and delete plugins, resources, ranks, and crates
- **File Uploads**: Handle plugin files, icons, and media
- **Order Management**: View and manage customer purchases
- **Statistics Dashboard**: Monitor revenue, users, and performance

### E-commerce
- **Shopping Cart**: Session-based cart management
- **Checkout Process**: Complete order processing
- **Payment Integration**: Ready for payment gateway integration
- **Order History**: Track purchases and downloads

## 🔒 Security Features

- **Session Management**: Secure session handling
- **Admin Authentication**: Protected admin routes
- **File Upload Security**: Controlled file upload with validation
- **Input Sanitization**: Protection against common vulnerabilities

## 🎨 Design Features

- **Modern UI**: Clean, professional design with purple/blue theme
- **Responsive Layout**: Mobile-first design approach
- **Animated Elements**: Smooth transitions and hover effects
- **Dark Theme**: Space-themed design with nebula effects
- **Component System**: Reusable UI components

## 📱 API Endpoints

### Public APIs
- `GET /api/plugins` - Get all plugins
- `GET /api/plugins/:id` - Get specific plugin
- `GET /api/resources` - Get all resources
- `GET /api/ranks` - Get all ranks
- `GET /api/crates` - Get all crates

### Cart APIs
- `GET /api/cart` - Get cart contents
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/cart/clear` - Clear cart

### Admin APIs (Protected)
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/logout` - Admin logout
- `POST /api/admin/plugins` - Create plugin
- `PUT /api/admin/plugins/:id` - Update plugin
- `DELETE /api/admin/plugins/:id` - Delete plugin

## 🚀 Deployment

### Production Setup

1. **Install PM2** (Process Manager)
   \`\`\`bash
   npm install -g pm2
   \`\`\`

2. **Start with PM2**
   \`\`\`bash
   pm2 start server.js --name "nebula-hosting"
   \`\`\`

3. **Configure Nginx** (Optional)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

### Environment Variables for Production

\`\`\`env
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-secure-secret-key
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@yaddusnetwork.com
- Documentation: Available in the `/docs` directory

## 🎯 Roadmap

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] User authentication system
- [ ] Real-time notifications
- [ ] Plugin rating and review system
- [ ] Advanced search and filtering
- [ ] API rate limiting
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

**Yaddu's Network** - Soaring through the cosmos of game server excellence! 🦕🚀
\`\`\`

This complete Node.js conversion includes:

## 🎯 **Key Features:**

1. **Express.js Backend** with RESTful APIs
2. **Vanilla Frontend** with modern JavaScript
3. **File Upload System** using Multer
4. **Session Management** for cart and admin
5. **Complete Admin Panel** for content management
6. **Shopping Cart System** with checkout
7. **Responsive Design** with mobile support
8. **Plugin Management** with screenshots and metadata

## 🚀 **To Run:**

\`\`\`bash
npm install
npm start
# Visit http://localhost:3000
\`\`\`

## 🔐 **Admin Access:**
- Press `Ctrl+Shift+A` and enter code: `admin123`
- Or visit `/admin` directly

The application is now fully converted to Node.js with all the original functionality intact!
