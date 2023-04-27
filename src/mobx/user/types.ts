export interface IUser {
  name: string;
  role: UserRoleEnum;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
export enum UserRoleEnum {
  user = "user",
  admin = "admin",
}

export interface IChangePasswordBody {
  oldPassword: string
  newPassword: string
}

export interface IChangeProfile {
  name: string
  email: string
}