import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import {
  validateEmail,
  validateLength,
  validatePassword,
} from "../../helpers/validate";
import User from "../../models/user/User";
import { autoGenerateUsername } from "../../helpers/generateUserName";
import { generateToken } from "../../helpers/token";
import { sendVerificationEmail } from "@/helpers/mailer";

// Define the expected request body type for registration
interface RegisterRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: string;
  birth_year: number;
  birth_year_month: number;
  birth_year_day: number;
}
// Define the expected request body type for verifyEmail
interface VerifyEmailRequestBody {
  token: string;
}

// Registration controller function
export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<Response> => {
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

  // Validate email
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Validate first and last name lengths
  if (!validateLength(first_name, 2, 30)) {
    return res
      .status(400)
      .json({ message: "First name must be between 3 and 30 characters" });
  }
  if (!validateLength(last_name, 2, 30)) {
    return res
      .status(400)
      .json({ message: "Last name must be between 3 and 30 characters" });
  }

  // Validate password
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  // Validate birth date components
  if (birth_year < 1900 || birth_year > new Date().getFullYear()) {
    return res.status(400).json({ message: "Invalid birth year" });
  }
  if (birth_year_month < 1 || birth_year_month > 12) {
    return res.status(400).json({ message: "Invalid birth month" });
  }
  if (
    birth_year_day < 1 ||
    birth_year_day > new Date(birth_year, birth_year_month, 0).getDate()
  ) {
    return res.status(400).json({ message: "Invalid birth day" });
  }

  // Generate username and hash password
  const username = await autoGenerateUsername(first_name, last_name);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create new user and save
    const user = new User({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
      gender,
      birth_year,
      birth_year_month,
      birth_year_day,
    });
    await user.save();

    // Generate email verification token
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.FRONTEND_URL}/verify-email/${emailVerificationToken}`;
    // Send email verification link to user
    sendVerificationEmail(user.email, user.first_name, url);

    // Generate JWT token and return user data
    const token = generateToken({ id: user._id.toString() }, "7d");
    return res.status(201).json({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register successfully please verify your email",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (
  req: Request<{}, {}, VerifyEmailRequestBody>,
  res: Response
): Promise<Response> => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (user as JwtPayload).id;
    const checkedUser = await User.findById(userId);
    const isVerified = checkedUser?.verified;
    if (isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    } else {
      await User.findByIdAndUpdate(userId, { verified: true });
      return res.status(200).json({ message: "Email verified successfully" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    const isVerified = user?.verified;

    if (!isVerified) {
      return res.status(401).json({ message: "Email not verified" });
    }
    const hashedPassword = (user && user.password) || "";
    const passwordMatch = bcrypt.compareSync(password, hashedPassword);

    if (!user || !passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ id: user._id.toString() }, "7d"); //
    return res.json({ token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
