const { db } = require("../db/connect");

const usersCollection = 'users';

module.exports.userRepositoryMongo = {
    find: async function() {
        let users = (await db).collection(usersCollection);
        return users.find().toArray();
    },

    findById: async function(id) {
        let users = (await db).collection(usersCollection);
        return users.findOne({_id: id})
    },

    findByEmail: async function(email) {
        let users = (await db).collection(usersCollection);
        return users.findOne({email: email})
    },

    create: async function(user) {
        let users = (await db).collection(usersCollection);
        return users.insertOne(user).then(
            res => this.findById(res.insertedId)
        );
    },

    update: async function(updatedUser) {
        let users = (await db).collection(usersCollection);
        return users.updateOne({_id: updatedUser._id}, {$set: updatedUser}).then(
            () => this.findById(updatedUser._id)
        );
    },

    delete: async function(id) {
        let users = (await db).collection(usersCollection);
        return users.deleteOne({_id: id});
    }
}