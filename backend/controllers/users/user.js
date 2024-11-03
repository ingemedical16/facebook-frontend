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
    res.status(400).json({ message: error.message });
  }
 
};
