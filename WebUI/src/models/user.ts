export interface IUser {
  readonly id?: number;
  readonly username?: string;
  readonly isadmin?: boolean;
}

export interface IUserRegister {
  readonly username?: string;
  readonly password?: string;
}
