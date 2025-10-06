function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ success: false, errors });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Erreur serveur"
    });
}

module.exports = errorHandler;
