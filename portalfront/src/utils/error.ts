import i18n from "./i18n";

export enum types {
  Auth = 'Auth',
  Highlights = 'Highlights',
}

export const parseError = (data: any, reference?: types): { code: number, message: string } => {
  switch (data?.status) {
    case 404:
      return {
        code: 404,
        message: i18n.t(`Generic.404`)
      }
    case 500:
      return {
        code: 500,
        message: i18n.t(`Generic.500`)
      }
    default: {
      return {
        code: +data?.status,
        message: i18n.t(`${reference}.${data?.data?.error}`)
      }
    }
  }
};
