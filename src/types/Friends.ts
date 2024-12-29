import { DefaultUser } from "./Post";

export type FriendsType = {
  friends: DefaultUser[];
  requests: DefaultUser[];
  sentRequests: DefaultUser[];
};
