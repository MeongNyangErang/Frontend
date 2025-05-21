export interface AuthToken {
  accessToken: string;
  refreshToken: string;
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

export interface ReIssueToken {
  accessToken: string;
}
