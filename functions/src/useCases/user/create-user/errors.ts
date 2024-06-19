/**
 */
export class ErrorUserAlreadyExists extends Error {
  /**
     * @param {string} message
     */
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
