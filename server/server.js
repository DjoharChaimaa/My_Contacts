const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
require("dotenv").config();

const authRoutes = require("./routes/Authentication_routes");
const contactRoutes = require("./routes/Contacts_routes");
const app = express();

//middleware
app.use(express.json());

//Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(" MongoDB Connecté");
  })
  .catch((err) => {
    console.error("Connexion MongoDB non reussie:", err.message);
  });

app.listen(process.env.APP_PORT, () => {
  console.log(`Server on http://localhost:${process.env.APP_PORT}`);
});

app.use(authRoutes);
app.use(contactRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
