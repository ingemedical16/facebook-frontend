// src/routes/user.ts

import express, { Router } from "express";
import { register, verifyEmail,login, sendVerification } from "../controllers/user/user";
import { isAuthenticated } from "../middlewares/authenticate";

const router: Router = express.Router();

router.post("/register", register);
router.post("/verify-email", isAuthenticated ,verifyEmail);
router.post("/sendVerification", isAuthenticated, sendVerification);
router.post("/login", login);

export default router;
