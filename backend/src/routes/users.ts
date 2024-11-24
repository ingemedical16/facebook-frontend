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
  removeFromSearch,
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
router.put("/removeFromSearch", isAuthenticated, removeFromSearch);

export default router;
