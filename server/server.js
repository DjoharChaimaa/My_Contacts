const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/Authentication_routes");
const contactRoutes = require("./routes/Contacts_routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// CORS avec CLIENT_URL
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connecté");
  })
  .catch((err) => {
    console.error("❌ Connexion MongoDB échouée:", err.message);
  });

const PORT = process.env.APP_PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Client URL: ${process.env.CLIENT_URL}`);
});

app.use(authRoutes);
app.use(contactRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(errorHandler);