const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/Authentication_routes");
const contactRoutes = require("./routes/Contacts_routes");
const app = express();

app.use(cors({
  origin: 'http://localhost:8082',
  credentials: true,
}));

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

/* i used next code to delete opld indexes
const Contact = require('./models/Contact');
Contact.collection.dropIndexes();
*/