// src/routes/user.ts

import express, { Router } from "express";
import { register, verifyEmail,login } from "../controllers/user/user";

const router: Router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

export default router;
