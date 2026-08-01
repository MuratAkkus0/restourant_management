export interface ProtectedRoutesProps {
  allowedRoles: AppUserRoles[];
}

export interface LoginWithEmailPassProps {
  (email: string, pass: string): void;
}

export interface registerData {
  name: string;
  surname: string;
  email: string;
  pass: string;
  passConfirm: string;
  street: string;
  houseNo: string;
  state: string;
  postalCode: string;
  city: string;
  country: string;
  companyName: string;
}

export interface RegisterWithEmailPassProps {
  (data: registerData): void;
}

export type AuthState = {
  user: {
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
  companyId: string | null;
  loading: boolean;
  role: AppUserRoles;
};
