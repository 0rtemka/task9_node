const { MyError } = require("./MyError");

module.exports.errorHandler = (err, req, res, next) => {
    if (err instanceof MyError) {
        res.status(err.status).send(err);
    } else {
        res.status(500).send({status: 500, message: err.message})
    }
}