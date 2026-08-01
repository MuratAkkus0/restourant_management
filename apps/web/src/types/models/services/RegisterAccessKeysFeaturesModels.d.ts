export interface ValidateAccessKeyProps {
  accessKey: string;
  companyId: string;
}

export type ValidateAccessKeyFunc = (
  data: ValidateAccessKeyProps
) => Promise<any>;

export type DeactiveAccessKeyFunc = (
  accessKey: string,
  companyId: string
) => void;
