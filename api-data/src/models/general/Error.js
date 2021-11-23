class DefaultError extends Error {
  constructor(code, message, details, messageToken) {
    super();

    this.code = code;
    this.details = details;
    this.message = message;
    this.messageToken = messageToken;
  }
}

export default DefaultError;
