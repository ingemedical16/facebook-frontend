const { validateEmail, validateLength, validateUsername } = require("../../helpers/validate");
const User = require("../../models/user/User");
exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    gender,
    birth_year,
    birth_year_month,
    birth_year_day,
  } = req.body;
  if(!validateEmail(email)){
    return res.status(400).json({ message: "Invalid email format" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }
  if(!validateLength(first_name,2,30)){
    return res.status(400).json({ message: "First name must be between 3 and 30 characters" });
  }
  if(!validateLength(last_name,2,30)){
    return res.status(400).json({ message: "Last name must be between 3 and 30 characters" });
  }
  if(!validatePassword(password)){
    return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
  }
  if(!validateUsername(username)){
    return res.status(400).json({ message: "Username must be between 3 and 30 characters and contain only alphanumeric characters and underscores" });
  }
  try {
    const user = new User({
        first_name,
        last_name,
        username,
        email,
        password,
        gender,
        birth_year,
        birth_year_month,
        birth_year_day,
      });
      await user.save();
      res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
};
