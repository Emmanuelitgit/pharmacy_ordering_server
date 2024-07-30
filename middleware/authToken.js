// const jwt = require("jsonwebtoken");

// const renewToken = async (req, res, next) => {
//     try {
        
//         const refreshToken = req.headers['authorization']?.split(' ')[1];

//         if (!refreshToken) {
//             return res.status(401).json({ message: "No token found" });
//         }

//         jwt.verify(refreshToken, "refresh_key", (err, decoded) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(401).json({ message: 'Refresh token has expired!' });
//             } else {
//                 const token = jwt.sign({ id: decoded.id, email: decoded.email }, "jwt_key", { expiresIn: '1h' });
//                 res.cookie("token", token, { maxAge: 30000 });
//                 req.email = decoded.email;
//                 next();
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

// const authenticateToken = async (req, res, next) => {
//     try {
//         const token = req.headers['authorization']?.split(' ')[1];

//         if (!token) {
//             return renewToken(req, res, next);
//         }

//         jwt.verify(token, "jwt_key", (err, decoded) => {
//             if (err && err.name === "TokenExpiredError") {
//                 return renewToken(req, res, next);
//             } else if (err) {
//                 console.log(err);
//                 return res.status(401).json({ message: 'Invalid token!' });
//             }
//             req.email = decoded.email;
//             next();
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

// module.exports = { authenticateToken };

// middleware/authToken.js

const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
    try {
        const token = await req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        jwt.verify(token, "jwt_key", (err, decoded) => {
            if (err) {
                console.log(err + "Token expired");
                return res.status(401).json({ message: 'Invalid or expired token!' });
            }
            req.email = decoded.email;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { authenticateToken };