class UsernameError extends Error {
  constructor(message) {
    super(message);
    this.name = "UsernameError";
  }
}
