const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config/dev");

const authMiddleware = (req, res, next) => {
    const token = req.header("x-auth-token");

    if(!token) return res.status(401).json({ msg: 'No token, authorization denied' })
    try {
        req.user = jwt.verify(token, SECRET_KEY);

        next();
    } catch (e) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
}

module.exports = authMiddleware;