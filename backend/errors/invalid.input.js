module.exports = class InvalidInput extends Error {
    constructor(message) {
        super(message);
        this.code = 401;
      }
}
