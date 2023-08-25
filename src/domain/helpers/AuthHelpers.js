const jwt = require("jsonwebtoken");
require("dotenv").config();

const controlUserChangeData = (req, userId) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) throw new Exception();
    var decodedClaims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decodedClaims.id != userId) return false; else return true;
} 

module.exports = { controlUserChangeData };