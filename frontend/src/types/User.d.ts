export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
export enum Relationship{
  Single = "single",
  Married = "married",
  Divorced = "divorced",
  Widowed = "widowed",
  Other = "other"
}

 export type UserDetails = {
    biography?: string;
    otherName?: string;
    job?: string;
    workPlace?: string;
    highSchool?: string;
    college?: string;
    currentCity?: string;
    homeTown?: string;
    relationShip?: RelationshipShip;
    instagram?: string;
  }
  export type savedPost = {
    post: string;
    savedAt: Date;
  }

 type User =  {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    picture?: string;
    cover?: string;
    gender: Gender;
    birth_year: number;
    birth_year_month: number;
    birth_year_day: number;
    verified?: boolean;
    friends?: string[];
    following?: string[];
    followers?: string[];
    requests?: string[];
    details?: UserDetails;
    savedPosts?: savedPost[];
  }

  export default User;
  