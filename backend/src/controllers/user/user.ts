import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import {
  validateEmail,
  validateLength,
  validatePassword,
} from "../../helpers/validate";
import User, { IUser } from "../../models/user/User";
import {
  autoGenerateUsername,
  generateToken,
  sendVerificationEmail,
  generateCode,
  sendResetCode,
  validateBirthDate,
  createErrorResponse,
} from "../../helpers";
import Code from "../../models/code/Code";
import mongoose from "mongoose";
import {
  FriendshipStatus,
  RegisterRequestBody,
  RequestWithUserId,
} from "../../types/types";
import { Post } from "../../models/post/Post";
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

  try {
    if (!validateEmail(email)) {
      return createErrorResponse(
        res,
        400,
        "INVALID_EMAIL",
        "Invalid email format."
      );
    }

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return createErrorResponse(
        res,
        400,
        "EMAIL_EXISTS",
        "Registration failed."
      );
    }

    if (!validateLength(first_name, 2, 30)) {
      return createErrorResponse(
        res,
        400,
        "INVALID_FIRST_NAME",
        "First name must be between 2 and 30 characters."
      );
    }
    if (!validateLength(last_name, 2, 30)) {
      return createErrorResponse(
        res,
        400,
        "INVALID_LAST_NAME",
        "Last name must be between 2 and 30 characters."
      );
    }

    if (!validatePassword(password)) {
      return createErrorResponse(
        res,
        400,
        "WEAK_PASSWORD",
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

    if (!validateBirthDate(birth_year, birth_year_month, birth_year_day)) {
      return createErrorResponse(
        res,
        400,
        "INVALID_BIRTH_DATE",
        "Invalid birth date provided."
      );
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const username = autoGenerateUsername(first_name, last_name);

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
      "2d"
    );
    const url = `${process.env.FRONTEND_URL}/verify-email/${emailVerificationToken}`;
    // Send email verification link to user
    sendVerificationEmail(user.email, user.first_name, url);

    // Generate JWT token and return user data
    const token = generateToken({ id: user._id.toString() }, "7d");
    return res.status(201).json({
      token: token,
      user: {
        id: user._id,
        username: user.username,
        picture: user.picture,
        first_name: user.first_name,
        last_name: user.last_name,
        verified: user.verified,
      },
      message: "User registered successfully. Please verify your email.",
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const verifyEmail = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const validUserId = req.user?.id;
    const { token } = req.body;

    if (!token) {
      return createErrorResponse(
        res,
        400,
        "INVALID_ACCESS_TOKEN",
        " Activation token is missing."
      );
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    const userId = decodedToken.id;
    const user = await User.findById(userId);

    if (!user) {
      return createErrorResponse(
        res,
        404,
        "USER_NOT_FOUND",
        "Authenticated user not found."
      );
    }

    if (validUserId !== userId) {
      return createErrorResponse(
        res,
        403,
        "INVALID_ACCESS_TOKEN",
        "You don't have authorization to complete this operation."
      );
    }

    if (user.verified) {
      return createErrorResponse(
        res,
        400,
        "EMAIL_ALREADY_ACTIVATED",
        "This email is already activated."
      );
    }

    user.verified = true;
    await user.save();

    return res
      .status(200)
      .json({ message: "Account has been activated successfully." });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};
export const sendVerification = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const id = req.user?.id;
    const user = await User.findById(id);
    if (!user) {
      return createErrorResponse(
        res,
        404,
        "USER_NOT_FOUND",
        "Authenticated user not found."
      );
    }

    if (user.verified === true) {
      return createErrorResponse(
        res,
        400,
        "EMAIL_ALREADY_ACTIVATED",
        "This email is already activated."
      );
    }

    // Generate email verification token
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "2d"
    );
    const url = `${process.env.FRONTEND_URL}/verify-email/${emailVerificationToken}`;
    // Send email verification link to user
    sendVerificationEmail(user.email, user.first_name, url);

    return res.status(200).json({
      message: "Verification email sent successfully.",
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password").exec();
    const hashedPassword = (user && user.password) || "";
    const passwordMatch = bcrypt.compareSync(password, hashedPassword);

    if (!user || !passwordMatch) {
      return createErrorResponse(
        res,
        401,
        "INVALID_CREDENTIALS",
        "Invalid email or password."
      );
    }

    const isVerified = user?.verified;

    if (!isVerified) {
      return createErrorResponse(
        res,
        403,
        "EMAIL_NOT_VERIFIED",
        "Email address is not verified. Please check your email for the verification link."
      );
    }

    const token = generateToken({ id: user._id.toString() }, "7d"); //
    return res.json({
      token: token,
      user: {
        id: user._id,
        username: user.username,
        picture: user.picture,
        first_name: user.first_name,
        last_name: user.last_name,
        verified: user.verified,
      },
      message: "Login successfully",
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const searchUserByEmail = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return createErrorResponse(
        res,
        404,
        "USER_NOT_FOUND",
        "User not found with this email address."
      );
    }

    return res.json({
      picture: user.picture,
      first_name: user.first_name,
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const sendResetPasswordCode = async (
  req: Request<{}, {}, { email: string }>,
  res: Response
): Promise<Response> => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return createErrorResponse(
        res,
        404,
        "USER_NOT_FOUND",
        "User not found with this email address."
      );
    }
    await Code.findOneAndDelete({ user: user._id });
    const code = generateCode(5);
    const savedCode = await new Code({
      code,
      user: user._id,
    });
    savedCode.save();
    sendResetCode(user.email, user.first_name, code);
    return res.status(200).json({
      message: "Reset code sent successfully. Please check your email.",
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const validateResetCode = async (
  req: Request<{}, {}, { email: string; code: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return createErrorResponse(
        res,
        404,
        "USER_NOT_FOUND",
        "User not found with this email address."
      );
    }

    const userCode = await Code.findOne({ user: user._id });
    if (!userCode || userCode.code !== code) {
      return createErrorResponse(
        res,
        401,
        "INVALID_RESET_CODE",
        "Invalid reset code. Please check the code and try again."
      );
    }
    await Code.findOneAndDelete({ user: user._id });
    return res
      .status(200)
      .json({ message: "Reset code validated successfully" });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const changePassword = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return createErrorResponse(
        res,
        404,
        "USER_NOT_FOUND",
        "User not found with this email address."
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const search = async (
  req: Request<{ searchTerm: string }, {}, {}>,
  res: Response
): Promise<Response> => {
  try {
    const searchTerm = req.params.searchTerm;

    if (!searchTerm) {
      return createErrorResponse(
        res,
        400,
        "SEARCH_TERM_REQUIRED",
        "Search term is required."
      );
    }

    // Search across relevant fields using regex
    const results = await User.find(
      {
        $or: [
          { first_name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive match
          { last_name: { $regex: searchTerm, $options: "i" } },
          { username: { $regex: searchTerm, $options: "i" } },
          { "details.biography": { $regex: searchTerm, $options: "i" } },
          { "details.otherName": { $regex: searchTerm, $options: "i" } },
          { "details.job": { $regex: searchTerm, $options: "i" } },
          { "details.workPlace": { $regex: searchTerm, $options: "i" } },
          { "details.highSchool": { $regex: searchTerm, $options: "i" } },
          { "details.college": { $regex: searchTerm, $options: "i" } },
          { "details.currentCity": { $regex: searchTerm, $options: "i" } },
          { "details.homeTown": { $regex: searchTerm, $options: "i" } },
        ],
      },
      { first_name: 1, last_name: 1, username: 1, picture: 1 }
    );
    return res.status(200).json({
      code: "SEARCH_SUCCESS",
      message: "Search completed successfully.",
      searchResult: results,
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};
export const addToSearchHistory = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    // Extract searchUser from the request body
    const { searchUser }: { searchUser: string } = req.body ?? {
      searchUser: "",
    };

    if (!searchUser || searchUser === "") {
      return createErrorResponse(
        res,
        400,
        "SEARCH_USER_REQUIRED",
        "Search user is required."
      );
    }

    // Ensure the searchUser is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(searchUser)) {
      return createErrorResponse(
        res,
        400,
        "INVALID_SEARCH_USER",
        "Search user is not a valid ObjectId."
      );
    }

    // Fetch the current user's document
    const user: IUser | null = await User.findById(req.user?.id);

    if (!user) {
      return createErrorResponse(
        res,
        401,
        "UNAUTHORIZED",
        "You are not authorized to perform this action."
      );
    }

    // Check if the searchUser already exists in the search history
    const existingIndex = user.search.findIndex(
      (id) => id.toString() === searchUser
    );

    if (existingIndex !== -1) {
      // If the user is already in the search history, move it to the end of the array
      user.search.splice(existingIndex, 1); // Remove the existing entry
    }

    // Add the searchUser to the search history and ensure the array doesn't grow indefinitely
    user.search.push(new mongoose.Types.ObjectId(searchUser));

    // Save the updated user document
    await user.save();
    const searchResult = await User.findById(req.user?.id)
      .select("search")
      .populate("search", "first_name last_name username picture");

    return res.status(200).json({
      code: "SEARCH_HISTORY_UPDATED",
      message: "Search history updated successfully.",
      search: searchResult?.search,
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const getSearchHistory = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    // Fetch the user by ID and populate the `search` array with selected fields
    const user = await User.findById(req.user?.id)
      .select("search")
      .populate("search", "first_name last_name username picture");

    if (!user) {
      return createErrorResponse(
        res,
        401,
        "UNAUTHORIZED",
        "You are not authorized to perform this action."
      );
    }

    // Return the populated search history
    return res.status(200).json({
      code: "SEARCH_HISTORY_RETRIEVED",
      message: "Search history retrieved successfully.",
      search: user.search,
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const removeFromSearchHistory = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const { searchUserId } = req.body; // Extract userId from the request body

    if (!searchUserId) {
      return createErrorResponse(
        res,
        400,
        "SEARCH_USER_ID_REQUIRED",
        "Search user ID is required."
      );
    }

    // Remove the userId from the authenticated user's search history
    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      { $pull: { search: searchUserId } }, // Pull the userId from the search array
      { new: true } // Return the updated document
    )
      .select("search") // Select only the search field
      .populate("search", "first_name last_name username picture"); // Populate user details in the search field

    if (!updatedUser) {
      return createErrorResponse(
        res,
        401,
        "UNAUTHORIZED",
        "You are not authorized to perform this action."
      );
    }
    return res.status(200).json({
      code: "SEARCH_USER_REMOVED",
      message: "User successfully removed from search history.",
      search: updatedUser.search,
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const getProfile = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const { username } = req.params;

    // Retrieve the authenticated user by ID
    const user = await User.findById(req.user?.id);
    if (!user) {
      return createErrorResponse(
        res,
        404,
        "USER_NOT_FOUND",
        "Authenticated user not found."
      );
    }

    // Retrieve the profile based on the username
    const profile = await User.findOne({ username }).select("-password");
    if (!profile) {
      return createErrorResponse(
        res,
        404,
        "PROFILE_NOT_FOUND",
        "Profile not found."
      );
    }

    const friendship: FriendshipStatus = {
      friends:
        user.friends.includes(profile._id.toString()) &&
        profile.friends.includes(user._id.toString()),
      following: user.following.includes(profile._id.toString()),
      requestSent: profile.requests.includes(user._id.toString()),
      requestReceived: user.requests.includes(profile._id.toString()),
    };

    // Retrieve posts for the profile
    const posts = await Post.find({ user: profile._id })
      .populate("user", "first_name last_name picture username") // Populate user info
      .populate(
        "comments.commentBy",
        "first_name last_name picture username commentAt" // Populate commentBy info
      )
      .sort({ createdAt: -1 });

    // Populate the friends field in the profile
    await profile.populate("friends", "first_name last_name username picture");

    // Return the profile with posts and friendship status
    return res.json({
      ...profile.toObject(),
      posts,
      friendship,
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const updateProfilePicture = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const { url } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      { picture: url },
      { new: true }
    );
    if (!updatedUser) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }
    return res.json({
      message: "Profile picture updated successfully.",
      picture: url,
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const updateCover = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const { url } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      { cover: url },
      { new: true }
    );
    if (!updatedUser) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }
    return res.json({ message: "Cover updated successfully.", cover: url });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const updateDetails = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const { infos } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user?.id,
      { details: infos },
      { new: true }
    );
    if (!updated) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }
    return res.json({
      message: "Details updated successfully.",
      details: updated?.details,
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const addFriend = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    if (req.user?.id === req.params.id) {
      return createErrorResponse(
        res,
        400,
        "INVALID_ACTION",
        "You can't send a friend request to yourself."
      );
    }
    const sender = await User.findById(req.user?.id);
    const receiver = await User.findById(req.params.id);
    if (!sender || !receiver) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }
    if (
      receiver.requests.includes(sender._id.toString()) ||
      receiver.friends.includes(sender._id.toString())
    ) {
      return createErrorResponse(
        res,
        400,
        "ALREADY_SENT",
        "Friend request already sent."
      );
    }
    await receiver.updateOne({
      $push: { requests: sender._id, followers: sender._id },
    });
    await sender.updateOne({ $push: { following: receiver._id } });
    return res.json({ message: "Friend request sent successfully." });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const cancelRequest = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    if (req.user?.id === req.params.id) {
      return createErrorResponse(
        res,
        400,
        "INVALID_ACTION",
        "You can't send a friend request to yourself."
      );
    }
    const sender = await User.findById(req.user?.id);
    const receiver = await User.findById(req.params.id);
    if (!sender || !receiver) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }

    if (!receiver.requests.includes(sender._id.toString())) {
      return createErrorResponse(
        res,
        400,
        "REQUEST_NOT_FOUND",
        "Friend request not found."
      );
    }
    if (receiver.friends.includes(sender._id.toString())) {
      return createErrorResponse(
        res,
        400,
        "ALREADY_FRIENDS",
        "Friend request already"
      );
    }
    await receiver.updateOne({
      $pull: { requests: sender._id, followers: sender._id },
    });
    await sender.updateOne({ $pull: { following: sender._id } });
    return res.json({ message: "Friend request canceled successfully." });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const follow = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?.id;
    const targetUserId = req.params.id;

    if (userId === targetUserId) {
      return createErrorResponse(
        res,
        400,
        "INVALID_ACTION",
        "You can't follow yourself."
      );
    }

    const sender = await User.findById(userId);
    const receiver = await User.findById(targetUserId);

    if (!sender || !receiver) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }

    if (
      receiver.followers.includes(sender._id.toString()) ||
      sender.following.includes(receiver._id.toString())
    ) {
      return createErrorResponse(
        res,
        400,
        "ALREADY_FOLLOWING",
        "You are already following this user."
      );
    }

    await receiver.updateOne({ $push: { followers: sender._id } });
    await sender.updateOne({ $push: { following: receiver._id } });

    return res.json({
      code: "FOLLOW_SUCCESS",
      message: "You successfully followed the user.",
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const unfollow = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?.id;
    const targetUserId = req.params.id;

    if (userId === targetUserId) {
      return createErrorResponse(
        res,
        400,
        "INVALID_ACTION",
        "You can't unfollow yourself."
      );
    }

    const sender = await User.findById(userId);
    const receiver = await User.findById(targetUserId);

    if (!sender || !receiver) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }

    if (
      !receiver.followers.includes(sender._id.toString()) ||
      !sender.following.includes(receiver._id.toString())
    ) {
      return createErrorResponse(
        res,
        400,
        "NOT_FOLLOWING",
        "You are not following this user."
      );
    }

    await receiver.updateOne({ $pull: { followers: sender._id } });
    await sender.updateOne({ $pull: { following: receiver._id } });

    return res.json({
      code: "UNFOLLOW_SUCCESS",
      message: "You successfully unfollowed the user.",
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};
export const acceptRequest = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?.id;
    const senderId = req.params.id;

    if (userId === senderId) {
      return createErrorResponse(
        res,
        400,
        "INVALID_ACTION",
        "You can't accept a request from yourself."
      );
    }

    const receiver = await User.findById(userId);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }

    if (!receiver.requests.includes(sender._id.toString())) {
      return createErrorResponse(
        res,
        400,
        "REQUEST_NOT_FOUND",
        "Friend request not found."
      );
    }

    await receiver.updateOne({
      $push: { friends: sender._id, following: sender._id },
      $pull: { requests: sender._id },
    });
    await sender.updateOne({
      $push: { friends: receiver._id, followers: receiver._id },
    });

    return res.json({
      code: "REQUEST_ACCEPTED",
      message: "Friend request successfully accepted.",
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};
export const unfriend = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?.id;
    const friendId = req.params.id;

    if (userId === friendId) {
      return createErrorResponse(
        res,
        400,
        "INVALID_ACTION",
        "You can't unfriend yourself."
      );
    }

    const sender = await User.findById(userId);
    const receiver = await User.findById(friendId);

    if (!sender || !receiver) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }

    if (
      !receiver.friends.includes(sender._id.toString()) ||
      !sender.friends.includes(receiver._id.toString())
    ) {
      return createErrorResponse(
        res,
        400,
        "NOT_FRIENDS",
        "You are not friends with this user."
      );
    }

    await receiver.updateOne({
      $pull: {
        friends: sender._id,
        following: sender._id,
        followers: sender._id,
      },
    });
    await sender.updateOne({
      $pull: {
        friends: receiver._id,
        following: receiver._id,
        followers: receiver._id,
      },
    });

    return res.json({
      code: "UNFRIEND_SUCCESS",
      message: "Successfully unfriended.",
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const deleteRequest = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?.id;
    const senderId = req.params.id;

    if (userId === senderId) {
      return createErrorResponse(
        res,
        400,
        "INVALID_ACTION",
        "You can't delete a request from yourself."
      );
    }

    const receiver = await User.findById(userId);
    const sender = await User.findById(senderId);

    if (!sender || !receiver) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }

    if (!receiver.requests.includes(sender._id.toString())) {
      return createErrorResponse(
        res,
        400,
        "REQUEST_NOT_FOUND",
        "Request not found or already deleted."
      );
    }

    // Remove the request from both users
    await receiver.updateOne({
      $pull: { requests: sender._id, followers: sender._id },
    });
    await sender.updateOne({
      $pull: { following: receiver._id },
    });

    return res.json({
      code: "REQUEST_DELETED",
      message: "Request successfully deleted.",
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const getFriendsPageInfos = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return createErrorResponse(res, 400, "USER_NOT_FOUND", "User not found.");
    }

    const user = await User.findById(userId)
      .select("friends requests")
      .populate("friends", "first_name last_name picture username")
      .populate("requests", "first_name last_name picture username");

    if (!user) {
      return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
    }

    const sentRequests = await User.find({
      requests: new mongoose.Types.ObjectId(userId),
    }).select("first_name last_name picture username");

    return res.json({
      code: "FRIENDS_PAGE_INFO",
      message: "Friends page information retrieved successfully.",
      friends: user.friends,
      requests: user.requests,
      sentRequests,
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};
