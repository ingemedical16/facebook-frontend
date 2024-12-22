export type DefaultUser = {
  first_name: string;
  last_name: string;
  username: string;
  picture?: string;
  gender?: "male" | "female" | "other";
  cover?: string;
};

export type Comment<T = DefaultUser> = {
  comment?: string;
  image?: string;
  commentBy: T;
  commentAt: Date;

};


export type Post<T = DefaultUser> = {
  _id: string;
  type: "profilePicture" | "coverPicture" | null;
  text?: string;
  images?: string[];
  user:T;
  background?: string;
  comments: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
};
