/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-généré du contact
 *         firstName:
 *           type: string
 *           description: Prénom du contact
 *         lastName:
 *           type: string
 *           description: Nom du contact
 *         phone:
 *           type: string
 *           description: Numéro de téléphone (10 à 20 caractères)
 *         userId:
 *           type: string
 *           description: le user qui a créé ce contact
 */
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Le prénom est obligatoire"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Le nom est obligatoire"],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, "Le téléphone est obligatoire"],
        validate: {
            validator: function(v) {
                return v.length >= 10 && v.length <= 20;
            },
            message: props => `Le numéro de téléphone n'est pas valide (10 à 20 caractères)`
        }
    },
    userId: {
        type: String,
        required: [true]
    }
}, { timestamps: true });

contactSchema.index({ phone: 1, userId: 1 }, { unique: true });
module.exports = mongoose.model("Contact", contactSchema);
