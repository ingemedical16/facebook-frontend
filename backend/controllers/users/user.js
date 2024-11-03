const bcrypt = require("bcrypt");
const { validateEmail, validateLength, validatePassword } = require("../../helpers/validate");
const User = require("../../models/user/User");
const { autoGenerateUsername } = require("../../helpers/generateUserName");
const { generatedToken } = require("../../helpers/token");
exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
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

  if(birth_year < 1900 || birth_year > new Date().getFullYear()){
    return res.status(400).json({ message: "Invalid birth year" });
  }
  if(birth_year_month < 1 || birth_year_month > 12){
    return res.status(400).json({ message: "Invalid birth month" });
  }
  if(birth_year_day < 1 || birth_year_day > new Date(birth_year, birth_year_month, 0).getDate()){
    return res.status(400).json({ message: "Invalid birth day" });
  }
  const username = await autoGenerateUsername(first_name, last_name);
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({
        first_name,
        last_name,
        username,
        email,
        password:hashedPassword,
        gender,
        birth_year,
        birth_year_month,
        birth_year_day,
      });
      await user.save();
      const emailVerificationToken = await generatedToken({id:user._id.toString()},'30m' );
      console.log(emailVerificationToken);
      res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
};
