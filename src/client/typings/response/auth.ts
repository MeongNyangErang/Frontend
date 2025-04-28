export interface LoginAccessToken {
  accessToken: string;
}

export interface UserProfile {
  nickname: string;
  profileImageUrl: string;
}

export interface HostProfile {
  name: string;
  nickname: string;
  profileImageUrl: string;
  phone: string;
}
