export enum UserRole {
  admin = 'admin',
  personal = 'personal',
}

export interface User {
  id: number;
  email: string;
}
export interface UserData {
  email: string;
  pass: string;
  errMessage?: string | null;
  loading: boolean;
}
export interface EmailAuthInputObj {
  email: string;
  pass: string;
  onSuccess: CallableFunction;
}
export interface GoogleLoginInputObj {
  onSuccess: CallableFunction;
}
