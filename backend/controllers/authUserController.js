const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) =>{
    
try {
    const { firstName, lastName, email,
        phone, password
    } = req.body;

    const emailExist = await User.findOne({ email });
    if(emailExist) return res.status(401).json({ message: "User Already Exist"});

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email,
        phone, password: hashed});

    const token = jwt.sign({ id: user._id, role: user.role, email:user.email, firstName: user.firstName}, process.env.JWT_SECRET, {
        expiresIn: '5h'
    });
    res.json({ token });
    
} catch (error) {
    console.log("Failed to connect server", error);
    
}
};

exports.login = async (req, res) =>{
    try {
        const { email, password} = req.body;

        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ message: "Email not found"});

        const passMatch = await bcrypt.compare(password, user.password);
        if(!passMatch) return res.status(401).json({ message: "Incorrect password"});

        const token = jwt.sign({ id: user._id, role: user.role, email: user.email, firstName: user.firstName}, process.env.JWT_SECRET, {
            expiresIn: '5h'
        });

        res.json({ token });
        
    } catch (error) {
        console.log("Failed to connect server", error);
        
    }

};