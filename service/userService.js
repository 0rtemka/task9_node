const { MyError } = require("../errors/MyError");
const { User } = require("../model/User");
const { userRepositoryMongo } = require("../repository/userRepositoryMongo");
const randomUUID = require('crypto').randomUUID;

function validateUser(user) {
    let message = [];
    const fields = ['name', 'email', 'age'];

    fields.forEach(field => {
        if (!user[field]) {
            message.push(`${field}: field is empty`);
        } else {
            if (field === 'age' && user[field] <= 0 || user[field] >= 150) {
                message.push(`${field}: incorrect value`);
            }
            if (field === 'email' && !validateEmail(user[field])) {
                message.push(`${field}: incorrect value`);
            }
        } 
    })


    if (message.length > 0) {
        throw new MyError(400, message.join("; "))
    }
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

module.exports.userService = {
    getAll: async function(sort=false) {
        return userRepositoryMongo.find().then(
            users => {
                if (sort) return users.sort((u1, u2) => u1.name.localeCompare(u2.name));
                return users;
            }
        )
    },

    getById: async function(id) {
        return userRepositoryMongo.findById(id)
            .then(user => {
                if (!user) throw new MyError(404, `user with id = ${id} not found`);
                return user;
            });
    },

    checkByEmail: async function(email, id='') {
        return userRepositoryMongo.findByEmail(email).then(
            user => {
                if (user && user._id !== id) throw new MyError(400, `user with email ${user.email} already exists`);
            }
        );
    },

    getByAge: async function(age) {
        const users = await userRepositoryMongo.find();
        return users.filter(user => user.age > age);
    },

    getByDomain: async function(domain) {
        const users = await userRepositoryMongo.find();
        return users.filter(user => user.email.split('@')[1].split('.')[0] === domain);
    },

    add: async function(user) {
        validateUser(user);
        await this.checkByEmail(user.email); // проверка на существование пользователя с таким же email

        user = new User(randomUUID(), user.name, user.email, user.age);

        return userRepositoryMongo.create(user);
    },

    update: async function(updatedUser, id) {
        validateUser(updatedUser);
        
        await this.getById(id); // проверка на существование пользователя
        await this.checkByEmail(updatedUser.email, id); // проверка на существование пользователя с таким же email
        
        updatedUser = new User(id, updatedUser.name, updatedUser.email, updatedUser.age, updatedUser.comments);

        return userRepositoryMongo.update(updatedUser);
    },

    delete: async function (id) {
        await this.getById(id); // проверка на существование пользователя
        userRepositoryMongo.delete(id);
    }
}