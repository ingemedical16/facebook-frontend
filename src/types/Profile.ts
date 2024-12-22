import { DefaultUser, Post } from "./Post";
import { FriendshipStatus } from "./types";
import { User } from "./User";

export type Profile =  User<DefaultUser> & {
    posts : Post[];
    friendship:FriendshipStatus
  }