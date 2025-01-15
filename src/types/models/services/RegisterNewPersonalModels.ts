import { AppUserRoles } from '@/types/enums/AuthEnums';

export type RegisterServiceBaseProps = {
  name: string;
  surname: string;
  email: string;
  pass: string;
};

export type RegisterServiceProps =
  | (RegisterServiceBaseProps & {
      role: AppUserRoles.ADMIN;
      street: string;
      houseNo: string;
      state: string;
      postalCode: string;
      city: string;
      country: string;
      companyName: string;
    })
  | (RegisterServiceBaseProps & {
      role: AppUserRoles.PERSONAL | AppUserRoles.PERSONAL;
      companyId: string;
    });

export type RegisterService = (data: RegisterServiceProps) => Promise<any>;

export type createUserInCompanyDocFunc = (
  subTableName: 'admins' | 'personals',
  userId: string,
  companyId: string,
  data: RegisterServiceProps
) => void;

export type createUsersCompaniesDocFunc = (
  userId: string,
  companyId: string,
  data: RegisterServiceProps
) => void;
