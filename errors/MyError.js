module.exports.MyError = class MyError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}