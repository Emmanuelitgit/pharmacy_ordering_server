const jwt = require("jsonwebtoken");

const renewToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "No token found" });
        }

        jwt.verify(refreshToken, "refresh_key", (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ message: 'Refresh token has expired!' });
            } else {
                const token = jwt.sign({ id: decoded.id, email: decoded.email }, "jwt_key", { expiresIn: '10s' });
                res.cookie("token", token, { maxAge: 30000 });
                req.email = decoded.email;
                next();
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return renewToken(req, res, next);
        }

        jwt.verify(token, "jwt_key", (err, decoded) => {
            if (err && err.name === "TokenExpiredError") {
                return renewToken(req, res, next);
            } else if (err) {
                console.log(err);
                return res.status(401).json({ message: 'Invalid token!' });
            }
            req.email = decoded.email;
            next();
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { authenticateToken };