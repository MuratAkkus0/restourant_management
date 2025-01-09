export enum AppUserRoles {
  'admin',
  'staff',
  'customer',
  'unknown',
}

export interface ProtectedRoutesProps {
  allowedRoles: AppUserRoles[];
}
