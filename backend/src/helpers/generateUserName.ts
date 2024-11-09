import User from "../models/user/User";

export const autoGenerateUsername = async (firstName: string, lastName: string): Promise<string> => {
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Date.now().toString().slice(-5)}`;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        return autoGenerateUsername(firstName, lastName);
    }
    
    return username;
};
