const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/Authentication_controller");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Création de compte et connexion
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Créer un compte
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Compte créé
 */
router.post("/auth/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Se connecter au compte
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 */
router.post("/auth/login", login);
module.exports = router;

