const Contact = require("../models/Contact");

const scopeContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
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