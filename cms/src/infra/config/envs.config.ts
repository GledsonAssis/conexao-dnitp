export class EnvsConfig {
  static apiServicoDnit(): string {
    return String(process.env.NEXT_PUBLIC_SERVICOS_DNIT);
  }

  static apiMaxSize(): number {
    return Number(process.env.NEXT_PUBLIC_SHARE_INITIATIVE_MAX_FILE_SIZE);
  }

  static getCmsUrl(): string {
    return String(process.env.NEXT_PUBLIC_CMS_URL);
  }

  static getAuthUrl(): string {
    return String(process.env.NEXT_PUBLIC_AUTH_API_URL);
  }

  static getVersion(): string {
    return String(process.env.NEXT_PUBLIC_VERSION);
  }

  static getFacebook(): string {
    return String(process.env.NEXT_PUBLIC_SOCIAL_NETWORK_FACEBOOK);
  }

  static getTwitter(): string {
    return String(process.env.NEXT_PUBLIC_SOCIAL_NETWORK_TWITTER);
  }

  static getInstagram(): string {
    return String(process.env.NEXT_PUBLIC_SOCIAL_NETWORK_INSTAGRAM);
  }

  static getYoutube(): string {
    return String(process.env.NEXT_PUBLIC_SOCIAL_NETWORK_YOUTUBE);
  }

  static getPortalFrontAddress(): string {
    return String(process.env.NEXT_PUBLIC_PORTALFRONT_ADDRESS);
  }

  static getGovBrAddress(): string {
    return String(process.env.NEXT_PUBLIC_GOVBR_SSO_ADDRESS);
  }

  static getGovBrRedirectUri(): string {
    return String(process.env.NEXT_PUBLIC_GOVBR_SSO_REDIRECT_URI);
  }

  static getBaseUrl(): string {
    return String(process.env.BASEURL);
  }
}
