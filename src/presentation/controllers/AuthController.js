const User = require("../../data/models/User");
const jwt = require("jsonwebtoken"); 
require("dotenv").config()
const userRepository = require("../../domain/repositories/UserRepository");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { email, password, name, surname } = req.body;
      
        if (!(email && password && name && surname)) {
            res.status(400).send("All input is required");
        }
        
        const oldUser = await userRepository.getByEmail(email);
      
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
      
        encryptedPassword = await bcrypt.hash(password, 10);
        
        const user = await userRepository.create({
            email: email,
            password: encryptedPassword,
            name: name,
            surname: surname
        });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        
        res.status(200).json({
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (err) {
        return res.sendStatus(500);
    } 
}

let refreshTokens = [];

const token = async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken(user);
        res.status(200).json({ accessToken: accessToken });
    });
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await userRepository.getByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            return res.status(200).json({ user: user, accessToken: accessToken, refreshToken: refreshToken });
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        return res.sendStatus(500);
    } 
}

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
}

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { login, register, token };