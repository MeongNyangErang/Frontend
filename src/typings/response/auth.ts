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
  currentPhoneNumber: string;
}

export interface UserProfileResponse {
  code: number;
  data: UserProfile;
}

export interface HostProfileResponse {
  code: number;
  data: HostProfile;
}
