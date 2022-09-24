export default class HttpError extends Error {
  constructor(public message: string, public errorCode: number) {
    super(message, errorCode); //add a message property;
  }
}

module.exports = HttpError;
