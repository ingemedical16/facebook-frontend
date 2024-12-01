
import { Request, Response } from "express";
import { Post } from "../../models/post/Post";
import User from "../../models/user/User";
import { createErrorResponse } from "../../helpers";
import { RequestWithUserId } from "@/types/types";


export const createPost = async (req: Request, res: Response): Promise<Response> => {
    try {
      const postData = req.body;
  
      // Ensure the body has necessary data
      if (!postData || !postData.content || !postData.user) {
        return createErrorResponse(res, 400, "MISSING_REQUIRED_FIELDS", "Content or user is missing.");
      }
  
      const post = await new Post(postData).save();
      await post.populate("user", "first_name last_name cover picture username");
  
      // Successful response
      return res.json({
        code: "POST_CREATED",
        message: "Post created successfully.",
        data: post,
      });
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || "An unexpected error occurred. Please try again later.";
      return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
    }
  };

  export const getAllPosts = async (req: RequestWithUserId, res: Response): Promise<Response> => {
    try {
      const userId = req.user?.id;
  
      if (!userId) {
        return createErrorResponse(res, 400, "USER_ID_MISSING", "User ID is missing in the request.");
      }
  
      // Fetch the list of users the current user is following
      const followingTemp = await User.findById(userId).select("following");
      if (!followingTemp) {
        return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
      }
  
      const following = followingTemp.following;
  
      // Fetch posts from users the current user is following
      const promises = following.map((userId) =>
        Post.find({ user: userId })
          .populate("user", "first_name last_name picture username cover")
          .populate("comments.commentBy", "first_name last_name picture username")
          .sort({ createdAt: -1 })
          .limit(10)
      );
  
      const followingPosts = await Promise.all(promises).then(posts => posts.flat());
  
      // Fetch the current user's own posts
      const userPosts = await Post.find({ user: userId })
        .populate("user", "first_name last_name picture username cover")
        .populate("comments.commentBy", "first_name last_name picture username")
        .sort({ createdAt: -1 })
        .limit(10);
  
      // Merge the user's posts with the following posts
      const allPosts = [...followingPosts, ...userPosts];
  
      // Sort all posts by creation date
      allPosts.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) {
          throw new Error("Missing createdAt property in a post");
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  
      // Respond with the sorted posts
      return res.json({
        code: "POSTS_FETCHED",
        message: "Posts fetched successfully.",
        data: allPosts,
      });
  
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "An unexpected error occurred. Please try again later.";
      return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
    }
  };

  export const comment = async (req: RequestWithUserId, res: Response): Promise<Response> => {
    try {
      const { comment, image, postId } = req.body;
      if (!comment || !postId) {
        return createErrorResponse(res, 400, "COMMENT_OR_POST_ID_MISSING", "Comment or post ID is missing.");
      }
  
      // Add the comment to the post
      const newComments = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comment: comment,
              image: image,
              commentBy: req.user?.id,
              commentAt: new Date(),
            },
          },
        },
        { new: true }
      )
        .populate("comments.commentBy", "picture first_name last_name username");
  
      if (!newComments) {
        return createErrorResponse(res, 404, "POST_NOT_FOUND", "Post not found.");
      }
  
      return res.json({
        code: "COMMENT_ADDED",
        message: "Comment added successfully.",
        data: newComments.comments,
      });
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "An unexpected error occurred. Please try again later.";
      return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
    }
  };

  export const savePost = async (req: RequestWithUserId, res: Response): Promise<Response> => {
    try {
      const postId = req.params.id;
      const user = await User.findById(req.user?.id);
  
      if (!user) {
        return createErrorResponse(res, 404, "USER_NOT_FOUND", "User not found.");
      }
  
      // Check if the post is already saved
      const existingSavedPost = user.savedPosts.find((post) => post.post.toString() === postId);
  
      if (existingSavedPost) {
        // Remove from saved posts if already saved
        await User.findByIdAndUpdate(req.user?.id, {
          $pull: { savedPosts: { postId: existingSavedPost?.post} },
        });
        return res.json({
          code: "POST_REMOVED_FROM_SAVED",
          message: "Post removed from saved list.",
        });
      } else {
        // Add to saved posts
        await User.findByIdAndUpdate(req.user?.id, {
          $push: {
            savedPosts: {
              post: postId,
              savedAt: new Date(),
            },
          },
        });
        return res.json({
          code: "POST_SAVED",
          message: "Post saved successfully.",
        });
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "An unexpected error occurred. Please try again later.";
      return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
    }
  };
  
  export const deletePost = async (req: Request, res: Response): Promise<Response> => {
    try {
      const postId = req.params.id;
      
      // Attempt to remove the post from the database
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return createErrorResponse(res, 404, "POST_NOT_FOUND", "Post not found.");
      }
  
      return res.json({
        code: "POST_DELETED",
        message: "Post deleted successfully.",
      });
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "An unexpected error occurred. Please try again later.";
      return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
    }
  };
  
  
  
  