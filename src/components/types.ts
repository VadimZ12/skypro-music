export type userType = {
    _id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  
  export type trackType = {
    data: string[];
    _id: number;
    name: string;
    author: string;
    release_date: string;
    genre: string;
    duration_in_seconds: number;
    album: string;
    logo: string | null;
    track_file: string;
    stared_user: userType[];
    tracksData: string[];
  };
  
  export type SigninFormType = {
    email: string;
    password: string;
  };
  
  export type SignupFormType = {
    email: string;
    password: string;
    username: string;
  };
  
  export type likeTrackFetchType = {
    access: string | null,
    id: string
  }