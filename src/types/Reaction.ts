export enum ReactionEnum {
  like = "like",
  love = "love",
  haha = "haha",
  sad = "sad",
  angry = "angry",
  wow = "wow",
}

export type Reaction = {
  reaction: ReactionEnum;
  postRef?: string;
  reactBy?: string;
};

export interface ReactionCount {
  reaction: ReactionEnum | string; 
  count: number;
}

export interface ReactionsData {
  reactions: ReactionCount[]; 
  userReaction?: ReactionEnum; 
  totalReacts: number; 
  isPostSaved: boolean; 
}