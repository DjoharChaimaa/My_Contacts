const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");

const scopeContacts = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ 
                success: false,
                message: "Token d'authentification requis" 
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        const user = decoded.id;
        
        const contacts = await Contact.find({ userId: user });
        
        res.json({
            success: true,
            data: contacts
        });
        
    } catch (err) {
        next(err);
    }
};

const scopeContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({ 
                success: false,
                message: "Contact non trouvé" 
            });
        }
        
        res.json({
            success: true,
            data: contact
        });
        
    } catch (err) {
        next(err);
    }
};

const createContact = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ 
                success: false,
                message: "Token d'authentification requis" 
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        const user = decoded.id;
        
        // Validation des champs requis
        const { firstName, lastName, phone } = req.body;
        
        if (!firstName || !lastName || !phone) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont obligatoires"
            });
        }

        req.body.userId = user;
        const contact = new Contact(req.body);
        await contact.save();
        
        res.status(201).json({
            success: true,
            message: "Contact créé avec succès",
            data: contact
        });
        
    } catch (err) {
        next(err);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const { firstName, lastName, phone } = req.body;
        
        // Validation des champs
        if (!firstName && !lastName && !phone) {
            return res.status(400).json({
                success: false,
                message: "Au moins un champ doit être modifié"
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!contact) {
            return res.status(404).json({ 
                success: false,
                message: "Contact non trouvé" 
            });
        }
        
        res.json({
            success: true,
            message: "Contact modifié avec succès",
            data: contact
        });
        
    } catch (err) {
        next(err);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            return res.status(404).json({ 
                success: false,
                message: "Contact non trouvé" 
            });
        }
        
        res.json({ 
            success: true,
            message: "Contact supprimé avec succès" 
        });
        
    } catch (err) {
        next(err);
    }
};

module.exports = { scopeContacts, scopeContact, createContact, updateContact, deleteContact };