const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const token = await req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        jwt.verify(token, "jwt_key", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token!' });
            }
            req.email = decoded.email;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error while verifying token!" });
    }
};

module.exports = { verifyToken };