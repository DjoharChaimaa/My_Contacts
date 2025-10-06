const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");

const scopeContacts = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        var user = decoded.id 
        const contacts = await Contact.find({userId : user});
        res.json(contacts);
    } catch (err) {
        next(err);
    }
};

const scopeContact = async (req, res, next) => {
    try {
        const contacts = await Contact.findById(req.params.id);
        res.json(contacts);
    } catch (err) {
        next(err);
    }
};

const createContact = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        var user = decoded.id 
        req.body.userId = user
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        next(err);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!contact) return res.status(404).json({ message: "Contact non trouvé" });
        res.json(contact);
    } catch (err) {
        next(err);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact non trouvé" });
        res.json({ message: "Contact supprimé" });
    } catch (err) {
        next(err);
    }
};

module.exports = {scopeContacts, scopeContact, createContact, updateContact, deleteContact};