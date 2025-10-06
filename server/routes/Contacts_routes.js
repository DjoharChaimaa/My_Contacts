const express = require("express");
const router = express.Router();
const {scopeContacts, scopeContact, createContact, updateContact, deleteContact} = require("../controllers/Contacts_controller");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Gestion des contacts (CRUD)
 */
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupérer tous les contacts
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 */
router.get("/contacts", scopeContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Récupérer un contact par son ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du contact à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Non autorisé (JWT manquant ou invalide)
 *       404:
 *         description: Contact non trouvé
 */
router.get("/contacts/:id", scopeContact);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Créer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact créé
 */
router.post("/contacts/create", createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Mettre à jour un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact mis à jour
 */
router.patch("/contacts/update/:id", updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé
 */
router.delete("/contacts/delete/:id", deleteContact);

module.exports = router;
