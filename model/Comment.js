module.exports.Comment = class Comment {
    constructor(id, title, body) {
        this._id = id;
        this.title = title;
        this.body = body;
    }
}