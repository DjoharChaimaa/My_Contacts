const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ 
                success: false,
                message: "Token d'authentification manquant" 
            });
        }

        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Format de token invalide" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
        
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ 
                success: false,
                message: "Session expirée, veuillez vous reconnecter" 
            });
        }
        
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ 
                success: false,
                message: "Token invalide" 
            });
        }

        next(err);
    }
};

module.exports = requireAuth;