const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/Authentication_routes");
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