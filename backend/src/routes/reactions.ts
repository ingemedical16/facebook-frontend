import express, { Router } from "express";
import * as reactionController from "@/controllers/reaction/reaction";
import { isAuthenticated } from "@/middlewares/authenticate";

const router: Router = express.Router();

/**
 * @swagger
 * /reactions/post-reaction:
 *   put:
 *     summary: Add or update a reaction to a post
 *     description: Allows the authenticated user to add or update a reaction to a post. If the user has already reacted, the reaction is updated or removed.
 *     tags:
 *       - Reactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 example: "60d3b41abd4c3b4e8c1e10b3"  # Post ID
 *               reaction:
 *                 type: string
 *                 enum: [like, love, haha, sad, wow, angry]
 *                 example: "like"  # The reaction type
 *     responses:
 *       200:
 *         description: Reaction successfully added or updated.
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
 *                   example: REACTION_ADDED
 *                 message:
 *                   type: string
 *                   example: "Reaction added successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     reaction:
 *                       type: string
 *                       example: "like"
 *       400:
 *         description: Post ID or reaction is missing.
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
 *                   example: POST_ID_OR_REACT_MISSING
 *                 message:
 *                   type: string
 *                   example: "Post ID or reaction type is missing."
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
 *                   example: "An unexpected error occurred. Please try again later."
 */
router.put(
  "/post-reaction",
  isAuthenticated,
  reactionController.handlePostReactionsByPostId
);

/**
 * @swagger
 * /reactions/getPostReactions/{id}:
 *   get:
 *     summary: Get all reactions for a post
 *     description: Retrieves all reactions for a specific post, grouped by type, and provides the total count of reactions. It also checks if the current user has reacted to the post and if the post is saved by the user.
 *     tags:
 *       - Reactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d3b41abd4c3b4e8c1e10b3"  # Post ID
 *     responses:
 *       200:
 *         description: Successfully fetched post reactions.
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
 *                   example: REACTION_DATA
 *                 message:
 *                   type: string
 *                   example: "Reactions retrieved successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     reactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           reaction:
 *                             type: string
 *                             example: "like"
 *                           count:
 *                             type: integer
 *                             example: 20
 *                     userReaction:
 *                       type: string
 *                       example: "like"
 *                     totalReacts:
 *                       type: integer
 *                       example: 100
 *                     isPostSaved:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Post not found.
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
 *                   example: POST_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: "Post not found."
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
 *                   example: "An unexpected error occurred. Please try again later."
 */
router.get(
  "/getPostReactions/:id",
  isAuthenticated,
  reactionController.getReactions
);

export default router;
