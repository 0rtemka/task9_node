module.exports.User = class User {
    constructor(id, name, email, age, comments = []) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.comments = comments;
    }
}