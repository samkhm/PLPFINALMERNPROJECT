const jwt = require("jsonwebtoken");
const axios = require("axios");

// Middleware to verify JWT token and attach user info
exports.protect = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token" });
    }

    const token = auth.split("Bearer ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

// Middleware to check user role
exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};

// Middleware to generate M-Pesa access token and attach to request
exports.generateToken = async (req, res, next) => {
    const secret = process.env.MPESA_CONSUMER_SECRET;
    const consumerKey = process.env.MPESA_CONSUMER_KEY;

    const auth = Buffer.from(`${consumerKey}:${secret}`).toString("base64");

    try {
        const { data } = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: {
                    authorization: `Basic ${auth}`,
                },
            }
        );

        req.token = data.access_token;
        next();
    } catch (err) {
        res.status(400).json({ error: "Token generation failed", details: err.message });
    }
};
