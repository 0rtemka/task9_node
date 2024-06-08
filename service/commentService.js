const { MyError } = require("../errors/MyError");
const { Comment } = require("../model/Comment");
const { userService } = require("./userService");
const randomUUID = require('crypto').randomUUID;

function checkComment(id, comments) {
    for (let i = 0; i < comments.length; i++) {
        if (comments[i]._id === id) return;
    }
    throw new MyError(404, `comment with id = ${id} not found`)
}

function validateComment(comment) {
    let message = [];
    const fields = ['title', 'body'];

    fields.forEach(field => {
        if (!comment[field]) {
            message.push(`${field}: field is empty`);
        }
    })

    if (message.length > 0) {
        throw new MyError(400, message.join("; "))
    }
}

module.exports.commentService = {

    getAll: async function(userId) {
        let user = await userService.getById(userId);
        return user.comments;
    },

    getById: async function(userId, commentId) {
        let user = await userService.getById(userId);
        checkComment(commentId, user.comments);
        return user.comments.filter(comment => comment._id === commentId)[0];
    },

    add: async function(userId, comment) {
        validateComment(comment);
        let user = await userService.getById(userId);

        comment = new Comment(randomUUID(), comment.title, comment.body);
        user.comments.push(comment);
        
        await userService.update(user, userId);
        return this.getAll(userId);
    },

    update: async function(userId, commentId, updatedComment) {
        validateComment(updatedComment);
        let user = await userService.getById(userId);
        checkComment(commentId, user.comments);

        updatedComment = new Comment(commentId, updatedComment.title, updatedComment.body);

        for (let i = 0; i < user.comments.length; i++) {
            if (user.comments[i]._id == commentId) {
                user.comments[i] = updatedComment;
            }
        };

        await userService.update(user, userId);
        return this.getById(userId, commentId);
    },

    delete: async function(userId, commentId) {
        let user = await userService.getById(userId);
        checkComment(commentId, user.comments);

        user.comments = user.comments.filter(comment => comment._id !== commentId);
        userService.update(user, userId);
    }
}