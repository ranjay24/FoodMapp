# FoodMap - Food Delivery System 🚚🍴

A full-stack food delivery application designed to provide users with a seamless online ordering experience while enabling efficient management for restaurant administrators. Built with the MERN stack, this system integrates key features such as real-time order tracking, authentication, and optimized delivery workflows.

---

## 🛠 Features

### User Features
- **Account Management**: Secure user registration and login with email verification.
- **Browse Restaurants**: View restaurant details, menus, and cuisines using a responsive UI.
- **Real-Time Order Tracking**: Track orders in real-time from placement to delivery.
- **Restaurant Location Integration**: Visualize restaurant and delivery locations using **Google Maps**.

### Admin Features
- **Order Management**: Manage orders efficiently with a real-time dashboard.
- **Menu Updates**: Add, update, or remove menu items dynamically.
- **Delivery Route Optimization**: Leverages mathematical models to minimize delivery time.

### Core Features
- **Responsive UI**: Built with **React.js** and styled with **Tailwind CSS** for mobile and desktop compatibility.
- **Secure Authentication**: JWT-based authentication for both users and admins.
- **Email Notifications**: Email verification for account creation using **SendGrid/MailerSend**.
- **Scalable Backend**: Developed with **Node.js** and **Express**, with **MongoDB** as the database.

---

## 🖥️ Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **APIs**: Google Maps API, SendGrid/MailerSend
- **Authentication**: JSON Web Tokens (JWT)

---

## 🚀 Getting Started

Follow the steps below to run the project locally:

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)
- SendGrid/MailerSend API key for email verification
- Google Maps API key for location integration

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/food-delivery-system.git
   cd food-delivery-system
   ```

2. **Install Dependencies**:
   ```bash
   # Install server dependencies
   cd backend
   npm install

   # Install client dependencies
   cd ../frontend
   npm install
   ```

3. **Set Environment Variables**:
   Create a `.env` file in the `backend` directory with the following:
   ```env
   PORT=Port_Number
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret
   MAILTRAP_API_KEY=your_sendgrid_api_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Run the Application**:
   ```bash
   # Start the backend
   cd backend
   npm run dev

   # Start the frontend
   cd ../frontend
   npm start
   ```

5. Open the app in your browser: `http://localhost:5173`

## 🧪 Testing
- To test email verification, ensure your **MailTrap API** is set up correctly.
- Use dummy user accounts to simulate signups and verify emails.

---

## 📂 Project Structure

### Backend
```
backend/
│
├── controllers/         # Logic for API endpoints
├── models/              # MongoDB schemas
├── routes/              # API routes
├── utils/               # Helper functions (e.g., email services)
└── server.js            # Entry point
```

### Frontend
```
frontend/
│
├── components/          # React components (UI)
├── pages/               # Page-level components
├── store/               # State management (e.g., Zustand or Redux)
└── App.tsx              # Main application file
```

---

## 📊 Future Enhancements
- Add a payment gateway integration (e.g., Stripe or PayPal).
- Implement push notifications for order updates.
- Enhance delivery route optimization with AI/ML models.

---

## 🏆 Contributors
- **Your Name** - [GitHub Profile](https://github.com/yourusername)
- **Team Member Name** - [GitHub Profile](https://github.com/teammemberusername)

---

## 🌟 Acknowledgments
- **Google Maps API** for location services.
- **MailTrap** for email functionality.
