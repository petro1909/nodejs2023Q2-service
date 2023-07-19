export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type CreateUserDto = Pick<User, 'login' | 'password'>;
export type UpdatePasswordDto = {
  oldPassword: string;
  newPassword: string;
};
