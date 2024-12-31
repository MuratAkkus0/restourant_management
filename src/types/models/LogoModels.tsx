export enum FontSizes {
  normal = 'text-xl py-1 px-4',
  regular = 'text-2xl py-1 px-4',
  semiRegular = 'text-3xl py-2 px-5',
  big = 'text-4xl py-3 px-6',
}
export enum LogoSizes {
  normal = 20,
  regular = 25,
  semiRegular = 30,
  big = 35,
}

export interface LogoProperties {
  FontSize?: FontSizes;
  LogoSize?: LogoSizes;
}
