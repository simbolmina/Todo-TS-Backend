"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message, errorCode); //add a message property;
        this.message = message;
        this.errorCode = errorCode;
    }
}
exports.default = HttpError;
module.exports = HttpError;
