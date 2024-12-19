export type ColorProps = {
  color: string;
};

export interface ResponseActionPayload<T = any> {
  message: string;
  code: string;
  data?: T;
}

export interface FriendshipStatus {
    friends: boolean;
    following: boolean;
    requestSent: boolean;
    requestReceived: boolean;
  }
  export type SearchApiResource = {
    public_id: string;
    format: string;
    width: number;
    height: number;
    created_at: string;
    secure_url: string;
    url: string;
    [key: string]: any; // Allow additional fields for flexibility
  };
  
  export type SearchApiResponse = {
    resources: SearchApiResource[];
    total_count: number;
    time: number;
  };