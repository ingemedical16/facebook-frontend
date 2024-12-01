// src/routes/user.ts

import express, { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  sendVerification,
  searchUserByEmail,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  search,
  addToSearchHistory,
  getSearchHistory,
  removeFromSearchHistory,
  getProfile,
  updateProfilePicture,
  updateCover,
  updateDetails,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  unfriend,
  deleteRequest,
  getFriendsPageInfos,
} from "../controllers/user/user";
import { isAuthenticated } from "../middlewares/authenticate";

const router: Router = express.Router();

router.post("/register", register);
router.post("/verify-email", isAuthenticated, verifyEmail);
router.post("/sendVerification", isAuthenticated, sendVerification);
router.post("/search-user", searchUserByEmail);
router.post("/login", login);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);
router.post("/search/:searchTerm",isAuthenticated, search);
router.put("/addToSearchHistory", isAuthenticated, addToSearchHistory);
router.get("/getSearchHistory", isAuthenticated, getSearchHistory);
router.put("/removeFromSearchHistory", isAuthenticated, removeFromSearchHistory);
router.get("/getProfile/:username", isAuthenticated, getProfile);
router.put("/updateProfilePicture", isAuthenticated, updateProfilePicture);
router.put("/updateCover", isAuthenticated, updateCover);
router.put("/updateDetails", isAuthenticated, updateDetails);
router.put("/addFriend/:id", isAuthenticated, addFriend);
router.put("/cancelRequest/:id", isAuthenticated, cancelRequest);
router.put("/follow/:id", isAuthenticated, follow);
router.put("/unfollow/:id", isAuthenticated, unfollow);
router.put("/unfriend/:id", isAuthenticated, unfriend);
router.put("/deleteRequest/:id", isAuthenticated, deleteRequest);
router.get("/getFriendsPageInfos", isAuthenticated, getFriendsPageInfos);

export default router;
