/**
 */
export class ErrorUserNotFound extends Error {
  /**
     * @param {string} message
     */
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
