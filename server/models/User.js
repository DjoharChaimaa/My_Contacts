/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-généré du compte
 *         firstName:
 *           type: string
 *           description: Prénom
 *         lastName:
 *           type: string
 *           description: Nom
 *         phone:
 *           type: string
 *           description: Numéro de téléphone (10 à 20 caractères)
 *         email:
 *           type: string
 *           description: Email 
 *         password:
 *           type: string
 *           description: Mot de passe
 */
const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, 
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", user);
module.exports = User;
