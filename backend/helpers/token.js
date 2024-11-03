const jwt = require("jsonwebtoken");

exports.generatedToken = (payload,expiresIn) => {
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn }
    );
    return token;
}