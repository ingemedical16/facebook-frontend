import React from "react";
import PostBackground from "./PostBackground";
import PostProfilePicture from "./PostProfilePicture";
import PostCover from "./PostCover";
import PostMedia from "./PostMedia";
import { Post } from "../../../types/Post";

interface PostContentProps {
    post: Post;
  }
  
  const PostContent: React.FC<PostContentProps> = ({ post }) => {
    if (post.background) {
      return (
        <PostBackground background={post.background} text={post.text || ""} />
      );
    }
  
    if (post.type === null) {
      return <PostMedia post={post} />;
    }
  
    if (post.type === "profilePicture") {
      return (
        <PostProfilePicture
          userCover={post.user?.cover}
          profilePicture={post.images?.[0] || ""}
        />
      );
    }
  
    return <PostCover image={post.images?.[0] || ""} />;
  };
  
  export default PostContent;