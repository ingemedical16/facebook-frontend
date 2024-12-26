export type ColorProps = {
  color: string;
};

export interface ResponseActionPayload<T = any> {
  message: string;
  code: string;
  data?: T;
  status: number;
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
  asset_folder:string
  url: string;
  [key: string]: any; // Allow additional fields for flexibility
};

export type SearchApiResponse = {
  resources: SearchApiResource[];
  total_count: number;
  time: number;
};

export interface Photo {
  asset_folder: string;
  secure_url: string;
  public_id: string;
}

export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Flip {
  horizontal: boolean;
  vertical: boolean;
}

export interface Story {
  profile_picture: string;
  profile_name: string;
  image: string;
}

