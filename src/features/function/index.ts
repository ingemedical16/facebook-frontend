import {
  resetMessageAndError,
  rejectedResponse,
  pendingResponse,
  getImagesUrl,
} from "./other";
import {
  register,
  verifyEmail,
  login,
  sendVerification,
  changePassword,
  sendResetPasswordCode,
  validateResetCode,
} from "./auth/index";
import {
  searchUserByEmail,
  search,
  addToSearchHistory,
  getSearchHistory,
  removeFromSearchHistory,
  getProfileByUsername,
  updateProfilePicture,
  updateCover,
  updateDetails,
  getFriendsPageInfos,
  addFriend,
  unfriend,
  acceptRequest,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
} from "./user";

import {
  createPost,
  getAllPosts,
  comment,
  savePost,
  deletePost,
  toggleSavePostAPI,
  deletePostAPI,
} from "./posts";

import { handlePostReactionsByPostId, getReactions, getReactionsAPI,handlePostReactionsByPostIdAPI } from "./reactions";

import {
  uploadFile,
  uploadFilesToCloud,
  searchImagesInCloud,
  uploadFilesToCloudAPI,
  searchImagesInCloudAPI
} from "./uploads";

import {
  createPrivateChat,
  sendMessage,
  addMemberToChat,
  removeMemberFromChat,
  getChatDetails,
  
  } from "./chat";

// Export all modules for easy importing in other parts of your application that require
export {
  register,
  verifyEmail,
  login,
  sendVerification,
  changePassword,
  sendResetPasswordCode,
  validateResetCode,
  searchUserByEmail,
  search,
  addToSearchHistory,
  getSearchHistory,
  removeFromSearchHistory,
  getProfileByUsername,
  updateProfilePicture,
  updateCover,
  updateDetails,
  getFriendsPageInfos,
  addFriend,
  unfriend,
  acceptRequest,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
  createPost,
  getAllPosts,
  comment,
  savePost,
  deletePost,
  handlePostReactionsByPostId,
  getReactions,
  uploadFile,
  uploadFilesToCloud,
  searchImagesInCloud,
  uploadFilesToCloudAPI,
  resetMessageAndError,
  rejectedResponse,
  pendingResponse,
  getImagesUrl,
  toggleSavePostAPI,
  deletePostAPI,
  getReactionsAPI,
  handlePostReactionsByPostIdAPI,
  searchImagesInCloudAPI,
  createPrivateChat,
  sendMessage,
  addMemberToChat,
  removeMemberFromChat,
  getChatDetails,
  
};
