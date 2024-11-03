const User = require("../models/user/User");

exports.autoGenerateUsername = async (firstName, lastName) => {
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Date.now().toString().slice(-5)}`;
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        return autoGenerateUsername(firstName, lastName);
    }
    return username;
};