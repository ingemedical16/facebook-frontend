// src/routes/user.ts

import express, { Router } from "express";
import * as userController from "@/controllers/user/user";
import { isAuthenticated } from "@/middlewares/authenticate";

const router: Router = express.Router();

/**
 * @swagger
 * /users/search-user:
 *   post:
 *     summary: Search user by email
 *     description: Endpoint to search for a user by their email address. Returns the user's basic details if found.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *                 description: The email address of the user to search for.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: User found successfully.
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
 *                   example: USER_FOUND
 *                 message:
 *                   type: string
 *                   example: User found successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     picture:
 *                       type: string
 *                       example: /profile/picture/url
 *                     first_name:
 *                       type: string
 *                       example: John
 *       404:
 *         description: User not found with the given email address.
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
router.post("/search-user", userController.searchUserByEmail);

/**
 * @swagger
 * /users/search/{searchTerm}:
 *   post:
 *     summary: Search users
 *     description: Perform a search for users based on various fields such as name, username, or profile details.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term to query across user data.
 *     responses:
 *       200:
 *         description: Search completed successfully.
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
 *                   example: SEARCH_RESULTS
 *                 message:
 *                   type: string
 *                   example: Search completed successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     searchResult:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                             example: John
 *                           last_name:
 *                             type: string
 *                             example: Doe
 *                           username:
 *                             type: string
 *                             example: johndoe123
 *                           picture:
 *                             type: string
 *                             example: /path/to/profile/picture
 *       400:
 *         description: Search term is required.
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
 *                   example: SEARCH_TERM_REQUIRED
 *                 message:
 *                   type: string
 *                   example: Search term is required.
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
router.post("/search/:searchTerm", isAuthenticated, userController.search);

/**
 * @swagger
 * /users/addToSearchHistory:
 *   put:
 *     summary: Add a user to the search history
 *     description: Endpoint to add a user to the authenticated user's search history.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchUser:
 *                 type: string
 *                 description: The ObjectId of the user to add to the search history.
 *                 example: 60b8d095d4e7c4f94588f7d1
 *             required:
 *               - searchUser
 *     responses:
 *       200:
 *         description: Search history updated successfully.
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
 *                   example: SEARCH_HISTORY_UPDATED
 *                 message:
 *                   type: string
 *                   example: Search history updated successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     search:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                             example: John
 *                           last_name:
 *                             type: string
 *                             example: Doe
 *                           username:
 *                             type: string
 *                             example: johndoe123
 *                           picture:
 *                             type: string
 *                             example: /path/to/profile/picture
 *       400:
 *         description: Missing search user or invalid search user ID.
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
 *                   example: SEARCH_USER_REQUIRED
 *                 message:
 *                   type: string
 *                   example: Search user is required.
 *       401:
 *         description: Unauthorized access.
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
 *                   example: UNAUTHORIZED
 *                 message:
 *                   type: string
 *                   example: You are not authorized to perform this action.
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
router.put(
  "/addToSearchHistory",
  isAuthenticated,
  userController.addToSearchHistory
);

/**
 * @swagger
 * /users/getSearchHistory:
 *   get:
 *     summary: Retrieve the search history of the authenticated user
 *     description: Endpoint to retrieve the search history of the authenticated user.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Search history retrieved successfully.
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
 *                   example: SEARCH_HISTORY_RETRIEVED
 *                 message:
 *                   type: string
 *                   example: Search history retrieved successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     search:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                             example: John
 *                           last_name:
 *                             type: string
 *                             example: Doe
 *                           username:
 *                             type: string
 *                             example: johndoe123
 *                           picture:
 *                             type: string
 *                             example: /path/to/profile/picture
 *       401:
 *         description: Unauthorized access.
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
 *                   example: UNAUTHORIZED
 *                 message:
 *                   type: string
 *                   example: You are not authorized to perform this action.
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
router.get(
  "/getSearchHistory",
  isAuthenticated,
  userController.getSearchHistory
);

/**
 * @swagger
 * /users/removeFromSearchHistory:
 *   put:
 *     summary: Remove a user from the search history of the authenticated user
 *     description: Endpoint to remove a specific user from the authenticated user's search history.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchUserId:
 *                 type: string
 *                 description: The ID of the user to be removed from the search history.
 *                 example: 605c72ef7c8e4f0f0f2a5b77
 *             required:
 *               - searchUserId
 *     responses:
 *       200:
 *         description: User successfully removed from search history.
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
 *                   example: SEARCH_USER_REMOVED
 *                 message:
 *                   type: string
 *                   example: User successfully removed from search history.
 *                 data:
 *                   type: object
 *                   properties:
 *                     search:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                             example: John
 *                           last_name:
 *                             type: string
 *                             example: Doe
 *                           username:
 *                             type: string
 *                             example: johndoe123
 *                           picture:
 *                             type: string
 *                             example: /path/to/profile/picture
 *       400:
 *         description: Missing searchUserId in the request body.
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
 *                   example: SEARCH_USER_ID_REQUIRED
 *                 message:
 *                   type: string
 *                   example: Search user ID is required.
 *       401:
 *         description: Unauthorized access.
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
 *                   example: UNAUTHORIZED
 *                 message:
 *                   type: string
 *                   example: You are not authorized to perform this action.
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
router.put(
  "/removeFromSearchHistory",
  isAuthenticated,
  userController.removeFromSearchHistory
);

/**
 * @swagger
 * /users/getProfile/{username}:
 *   get:
 *     summary: Get a user profile by username
 *     description: Endpoint to retrieve a user's profile, including their posts and friendship status with the authenticated user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user whose profile is to be retrieved.
 *         schema:
 *           type: string
 *           example: johndoe123
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
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
 *                   example: PROFILE_RETRIEVED
 *                 message:
 *                   type: string
 *                   example: Profile retrieved successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 605c72ef7c8e4f0f0f2a5b77
 *                     first_name:
 *                       type: string
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       example: Doe
 *                     username:
 *                       type: string
 *                       example: johndoe123
 *                     picture:
 *                       type: string
 *                       example: /path/to/profile/picture
 *                     posts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           content:
 *                             type: string
 *                             example: This is a post.
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-12-07T12:34:56Z
 *                           comments:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 comment:
 *                                   type: string
 *                                   example: Nice post!
 *                                 commentBy:
 *                                   type: object
 *                                   properties:
 *                                     first_name:
 *                                       type: string
 *                                       example: Jane
 *                                     last_name:
 *                                       type: string
 *                                       example: Smith
 *                                     picture:
 *                                       type: string
 *                                       example: /path/to/commenter/picture
 *                                     username:
 *                                       type: string
 *                                       example: janesmith
 *                                 commentAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: 2024-12-07T12:35:30Z
 *                     friendship:
 *                       type: object
 *                       properties:
 *                         friends:
 *                           type: boolean
 *                           example: true
 *                         following:
 *                           type: boolean
 *                           example: false
 *                         requestSent:
 *                           type: boolean
 *                           example: true
 *                         requestReceived:
 *                           type: boolean
 *                           example: false
 *       404:
 *         description: Profile not found or user not authenticated.
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
 *                   example: PROFILE_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: Profile not found.
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
router.get("/getProfile/:username", isAuthenticated, userController.getProfile);

/**
 * @swagger
 * /users/updateProfilePicture:
 *   put:
 *     summary: Update profile picture
 *     description: Endpoint to update the authenticated user's profile picture.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the new profile picture.
 *                 example: /path/to/new/profile/picture.jpg
 *             required:
 *               - url
 *     responses:
 *       200:
 *         description: Profile picture updated successfully.
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
 *                   example: PROFILE_PICTURE_UPDATE
 *                 message:
 *                   type: string
 *                   example: Profile picture updated successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     picture:
 *                       type: string
 *                       example: /path/to/new/profile/picture.jpg
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
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
router.put(
  "/updateProfilePicture",
  isAuthenticated,
  userController.updateProfilePicture
);

/**
 * @swagger
 * /users/updateCover:
 *   put:
 *     summary: Update cover image
 *     description: Endpoint to update the authenticated user's cover image.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the new cover image.
 *                 example: /path/to/new/cover/image.jpg
 *             required:
 *               - url
 *     responses:
 *       200:
 *         description: Cover image updated successfully.
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
 *                   example: COVER_UPDATE
 *                 message:
 *                   type: string
 *                   example: Cover updated successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     cover:
 *                       type: string
 *                       example: /path/to/new/cover/image.jpg
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
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
router.put("/updateCover", isAuthenticated, userController.updateCover);

/**
 * @swagger
 * /users/updateDetails:
 *   put:
 *     summary: Update user details
 *     description: Endpoint to update the details of the authenticated user (e.g., biography, job, etc.).
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               infos:
 *                 type: object
 *                 description: The new details to be updated (e.g., biography, job, etc.).
 *                 example:
 *                   biography: "Software developer with a passion for coding."
 *                   job: "Senior Developer"
 *                   workPlace: "TechCorp"
 *                   highSchool: "Springfield High"
 *                   college: "Tech University"
 *                   currentCity: "New York"
 *                   homeTown: "Los Angeles"
 *             required:
 *               - infos
 *     responses:
 *       200:
 *         description: User details updated successfully.
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
 *                   example: DETAILS_UPDATE
 *                 message:
 *                   type: string
 *                   example: Details updated successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     details:
 *                       type: object
 *                       description: The updated user details.
 *                       example:
 *                         biography: "Software developer with a passion for coding."
 *                         job: "Senior Developer"
 *                         workPlace: "TechCorp"
 *                         highSchool: "Springfield High"
 *                         college: "Tech University"
 *                         currentCity: "New York"
 *                         homeTown: "Los Angeles"
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
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
router.put("/updateDetails", isAuthenticated, userController.updateDetails);

/**
 * @swagger
 * /users/addFriend/{id}:
 *   put:
 *     summary: Send a friend request
 *     description: Allows the authenticated user to send a friend request to another user by their user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to send the friend request to.
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109d8
 *     responses:
 *       200:
 *         description: Friend request sent successfully.
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
 *                   example: FRIEND_REQUEST_SUCCESS
 *                 message:
 *                   type: string
 *                   example: Friend request sent successfully.
 *       400:
 *         description: Invalid action or friend request already sent.
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
 *                   example: INVALID_ACTION
 *                 message:
 *                   type: string
 *                   example: You can't send a friend request to yourself.
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
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
router.put("/addFriend/:id", isAuthenticated, userController.addFriend);

/**
 * @swagger
 * /users/acceptRequest/{id}:
 *   put:
 *     summary: Accept a friend request
 *     description: Allows the authenticated user to accept a friend request from another user.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user who sent the friend request.
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109d8
 *     responses:
 *       200:
 *         description: Successfully accepted the friend request.
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
 *                   example: FRIEND_REQUEST_ACCEPTED
 *                 message:
 *                   type: string
 *                   example: Friend request successfully accepted.
 *       400:
 *         description: Invalid action, friend request not found, or trying to accept a request from yourself.
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
 *                   example: INVALID_ACTION
 *                 message:
 *                   type: string
 *                   example: You can't accept a request from yourself.
 *       404:
 *         description: User not found or friend request not found.
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
 *                   example: User not found.
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
router.put("/acceptRequest/:id", isAuthenticated, userController.acceptRequest);

/**
 * @swagger
 * /users/cancelRequest/{id}:
 *   put:
 *     summary: Cancel a sent friend request
 *     description: Allows the authenticated user to cancel a friend request they previously sent to another user.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to cancel the friend request for.
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109d8
 *     responses:
 *       200:
 *         description: Friend request canceled successfully.
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
 *                   example: FRIEND_REQUEST_CANCELED
 *                 message:
 *                   type: string
 *                   example: Friend request canceled successfully.
 *       400:
 *         description: Invalid action, friend request not found, or already friends.
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
 *                   example: INVALID_ACTION
 *                 message:
 *                   type: string
 *                   example: You can't send a friend request to yourself.
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
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
router.put("/cancelRequest/:id", isAuthenticated, userController.cancelRequest);

/**
 * @swagger
 * /users/follow/{id}:
 *   put:
 *     summary: Follow a user
 *     description: Allows the authenticated user to follow another user.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to follow.
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109d8
 *     responses:
 *       200:
 *         description: Successfully followed the user.
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
 *                   example: FOLLOW_SUCCESS
 *                 message:
 *                   type: string
 *                   example: You successfully followed the user.
 *       400:
 *         description: Invalid action, already following, or trying to follow yourself.
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
 *                   example: INVALID_ACTION
 *                 message:
 *                   type: string
 *                   example: You can't follow yourself.
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
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
router.put("/follow/:id", isAuthenticated, userController.follow);

/**
 * @swagger
 * /users/unfollow/{id}:
 *   put:
 *     summary: Unfollow a user
 *     description: Allows the authenticated user to unfollow another user.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to unfollow.
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109d8
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user.
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
 *                   example: UNFOLLOW_SUCCESS
 *                 message:
 *                   type: string
 *                   example: You successfully unfollowed the user.
 *       400:
 *         description: Invalid action, not following the user, or trying to unfollow yourself.
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
 *                   example: INVALID_ACTION
 *                 message:
 *                   type: string
 *                   example: You can't unfollow yourself.
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
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
router.put("/unfollow/:id", isAuthenticated, userController.unfollow);

/**
 * @swagger
 * /users/unfriend/{id}:
 *   put:
 *     summary: Unfriend a user
 *     description: Allows the authenticated user to unfriend another user.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to unfriend.
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109d8
 *     responses:
 *       200:
 *         description: Successfully unfriended the user.
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
 *                   example: FRIEND_UNFRIEND
 *                 message:
 *                   type: string
 *                   example: Friendship successfully unfriended.
 *       400:
 *         description: Invalid action, not friends, or trying to unfriend yourself.
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
 *                   example: INVALID_ACTION
 *                 message:
 *                   type: string
 *                   example: You can't unfriend yourself.
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
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
router.put("/unfriend/:id", isAuthenticated, userController.unfriend);

/**
 * @swagger
 * /users/deleteRequest/{id}:
 *   put:
 *     summary: Delete a friend request
 *     description: Allows the authenticated user to delete a pending friend request sent to another user.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user whose friend request will be deleted.
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109d8
 *     responses:
 *       200:
 *         description: Successfully deleted the friend request.
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
 *                   example: REQUEST_DELETED
 *                 message:
 *                   type: string
 *                   example: Request successfully deleted.
 *       400:
 *         description: Invalid action (trying to delete a request from yourself) or request not found.
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
 *                   example: INVALID_ACTION
 *                 message:
 *                   type: string
 *                   example: You can't delete a request from yourself.
 *       404:
 *         description: User not found or the request does not exist.
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
 *                   example: User not found.
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
router.put("/deleteRequest/:id", isAuthenticated, userController.deleteRequest);

/**
 * @swagger
 * /users/getFriendsPageInfos:
 *   get:
 *     summary: Get friends page information
 *     description: Retrieves the list of friends, friend requests, and sent friend requests for the authenticated user.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved the friends page information.
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
 *                   example: FRIENDS_PAGE_INFO
 *                 message:
 *                   type: string
 *                   example: Friends page information retrieved successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     friends:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                             example: John
 *                           last_name:
 *                             type: string
 *                             example: Doe
 *                           picture:
 *                             type: string
 *                             example: "http://example.com/pic.jpg"
 *                           username:
 *                             type: string
 *                             example: john_doe
 *                     requests:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                             example: Jane
 *                           last_name:
 *                             type: string
 *                             example: Smith
 *                           picture:
 *                             type: string
 *                             example: "http://example.com/pic.jpg"
 *                           username:
 *                             type: string
 *                             example: jane_smith
 *                     sentRequests:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                             example: Alice
 *                           last_name:
 *                             type: string
 *                             example: Brown
 *                           picture:
 *                             type: string
 *                             example: "http://example.com/pic.jpg"
 *                           username:
 *                             type: string
 *                             example: alice_brown
 *       400:
 *         description: User not found (either the user is not authenticated or does not exist).
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
 *                   example: User not found.
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
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
router.get(
  "/getFriendsPageInfos",
  isAuthenticated,
  userController.getFriendsPageInfos
);

export default router;
