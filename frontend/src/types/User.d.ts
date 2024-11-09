export interface IUser {
    _id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    picture?: string;
    cover?: string;
    gender: "male" | "female" | "other";
    birth_year: number;
    birth_year_month: number;
    birth_year_day: number;
    verified?: boolean;
    friends?: string[];
    following?: string[];
    followers?: string[];
    requests?: string[];
    details?: {
      biography?: string;
      otherName?: string;
      job?: string;
      workPlace?: string;
      highSchool?: string;
      college?: string;
      currentCity?: string;
      homeTown?: string;
      relationShip?: "single" | "married" | "divorced" | "widowed" | "other";
      instagram?: string;
    };
    savedPosts?: { post: string; savedAt: Date }[];
  }
  