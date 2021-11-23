class AuthError extends Error {
  status: number;

  details: any;

  constructor(error: any) {
    super();

    this.status = 401;
    this.details = error;
  }
}

export default AuthError;
