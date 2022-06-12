class PasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = "PasswordError";
  }
}
