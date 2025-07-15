const jwt = require("jsonwebtoken");

//check token and req user

exports.protect = (req, res, next) =>{
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith("Bearer ")) return res.status(404).json({message: "No token"});

    const token = auth.split("Bearer ")[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
    } catch (error) {
        res.satus(403).json({ message: "Invalid token"});
                
    }
    next();
};

//check roles
exports.authorize = (roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbiden"});
        next(); 
    }
        
};