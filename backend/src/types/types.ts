import { Request } from "express";
export interface FriendshipStatus {
  friends: boolean;
  following: boolean;
  requestSent: boolean;
  requestReceived: boolean;
}

export interface RegisterRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: string;
  birth_year: number;
  birth_year_month: number;
  birth_year_day: number;
}
// Define the expected request body type for verifyEmail
export interface VerifyEmailRequestBody {
  token: string;
}
export interface RequestWithUserId extends Request {
  user?: { id: string };
}

export interface FriendshipStatus {
    friends: boolean;
    following: boolean;
    requestSent: boolean;
    requestReceived: boolean;
  }