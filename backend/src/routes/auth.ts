import express, { Router } from "express";
import * as authController from "@/controllers/auth/auth";
import { isAuthenticated } from "@/middlewares/authenticate";
const router: Router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user with all required details. After successful registration, an email verification link is sent to the user's email address.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *                 description: The first name of the user (2-30 characters).
 *               last_name:
 *                 type: string
 *                 example: Doe
 *                 description: The last name of the user (2-30 characters).
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *                 description: A valid email address.
 *               password:
 *                 type: string
 *                 example: Password@123
 *                 description: A strong password meeting the required complexity (minimum 8 characters, including uppercase, lowercase, number, and special character).
 *               gender:
 *                 type: string
 *                 example: male
 *                 description: Gender of the user (e.g., male, female, other).
 *               birth_year:
 *                 type: integer
 *                 example: 1995
 *                 description: The year of birth of the user.
 *               birth_month:
 *                 type: integer
 *                 example: 8
 *                 description: The month of birth of the user.
 *               birth_year_day:
 *                 type: integer
 *                 example: 15
 *                 description: The day of birth of the user.
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *               - gender
 *               - birth_year
 *               - birth_month
 *               - birth_year_day
 *     responses:
 *       201:
 *         description: User registered successfully. Email verification link has been sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: string
 *                   example: REGISTER_SUCCESS
 *                 message:
 *                   type: string
 *                   example: User registered successfully. Please verify your email.
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 60c72b2f9b1d8a5d3c4e7e58
 *                         username:
 *                           type: string
 *                           example: johndoe
 *                         picture:
 *                           type: string
 *                           example: /profile/picture/url
 *                         first_name:
 *                           type: string
 *                           example: John
 *                         last_name:
 *                           type: string
 *                           example: Doe
 *                         verified:
 *                           type: boolean
 *                           example: false
 *       400:
 *         description: Bad request, validation errors occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: INVALID_EMAIL
 *                 message:
 *                   type: string
 *                   example: Invalid email format.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: SERVER_ERROR
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post("/register", authController.register);
/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify a user's email
 *     description: Verifies the email of an authenticated user using a provided activation token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 description: The email activation token received by the user.
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: Email has been successfully verified.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: string
 *                   example: EMAIL_ACTIVATION_SUCCESS
 *                 message:
 *                   type: string
 *                   example: Email has been successfully verified. You can now log in.
 *       400:
 *         description: Missing or invalid activation token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: INVALID_ACCESS_TOKEN
 *                 message:
 *                   type: string
 *                   example: Activation token is missing.
 *       403:
 *         description: Unauthorized access to verify the email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: INVALID_ACCESS_TOKEN
 *                 message:
 *                   type: string
 *                   example: You don't have authorization to complete this operation.
 *       404:
 *         description: Authenticated user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: USER_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: Authenticated user not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: SERVER_ERROR
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post("/verify-email", isAuthenticated, authController.verifyEmail);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and generates an access token if the credentials are valid.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: The user's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: string
 *                   example: LOGIN_SUCCESS
 *                 message:
 *                   type: string
 *                   example: Login successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 648f72ec3e29c9e2548d9a3f
 *                         username:
 *                           type: string
 *                           example: johndoe
 *                         picture:
 *                           type: string
 *                           example: https://example.com/avatar.jpg
 *                         first_name:
 *                           type: string
 *                           example: John
 *                         last_name:
 *                           type: string
 *                           example: Doe
 *                         verified:
 *                           type: boolean
 *                           example: true
 *       400:
 *         description: Missing or invalid required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: INVALID_CREDENTIALS
 *                 message:
 *                   type: string
 *                   example: Invalid email or password.
 *       401:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: INVALID_CREDENTIALS
 *                 message:
 *                   type: string
 *                   example: Invalid email or password.
 *       403:
 *         description: Email not verified.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: EMAIL_NOT_VERIFIED
 *                 message:
 *                   type: string
 *                   example: Email address is not verified. Please check your email for the verification link.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: SERVER_ERROR
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/sendVerification:
 *   post:
 *     summary: Send email verification link
 *     description: Sends a verification email to the authenticated user's registered email address. The verification email contains a link to verify the user's email address.
 *    tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verification email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: string
 *                   example: VERIFICATION_EMAIL_SENT
 *                 message:
 *                   type: string
 *                   example: Verification email has been sent to your registered email address.
 *       400:
 *         description: Email already activated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: EMAIL_ALREADY_ACTIVATED
 *                 message:
 *                   type: string
 *                   example: This email is already activated.
 *       404:
 *         description: User not found or unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: USER_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: Authenticated user not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: SERVER_ERROR
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post(
  "/sendVerification",
  isAuthenticated,
  authController.sendVerification
);

/**
 * @swagger
 * /auth/sendResetPasswordCode:
 *   post:
 *     summary: Send a reset code to the user
 *     description: This endpoint sends a password reset code to the user's email if the email is valid and associated with an existing account.
 *    tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user requesting a password reset.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset code sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: string
 *                   example: RESET_CODE_SUCCESS
 *                 message:
 *                   type: string
 *                   example: Reset code sent successfully. Please check your email.
 *       400:
 *         description: Invalid email address.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: INVALID_EMAIL
 *                 message:
 *                   type: string
 *                   example: Invalid email address.
 *       404:
 *         description: User not found with this email address.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: USER_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: User not found with this email address.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: SERVER_ERROR
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post("/sendResetPasswordCode", authController.sendResetPasswordCode);

/**
 * @swagger
 * /auth/validateResetCode:
 *   post:
 *     summary: Validate a reset code for password recovery
 *    tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 description: The reset code sent to the user's email.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Reset code validated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: string
 *                   example: RESET_CODE_VALIDATED
 *                 message:
 *                   type: string
 *                   example: Reset code has been validated successfully.
 *       401:
 *         description: Invalid reset code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: INVALID_RESET_CODE
 *                 message:
 *                   type: string
 *                   example: Invalid reset code. Please check the code and try again.
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: USER_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: User not found with this email address.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: SERVER_ERROR
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post("/validateResetCode", authController.validateResetCode);

/**
 * @swagger
 * /auth/changePassword:
 *   post:
 *     summary: Change a user's password
 *    tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user whose password needs to be changed.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The new password for the user.
 *                 example: "newSecurePassword123"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: string
 *                   example: PASSWORD_CHANGED
 *                 message:
 *                   type: string
 *                   example: Password changed successfully.
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: USER_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: User not found with this email address.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: SERVER_ERROR
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post("/changePassword", authController.changePassword);

export default router;
