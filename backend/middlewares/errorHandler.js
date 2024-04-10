const AlreadyExist = require("../errors/already.exist.error");
const BadRequest = require("../errors/bad.request.error");
const InvalidInput = require("../errors/invalid.input");
const NotFoundError = require("../errors/not.found.error");
const ServerError = require("../errors/server.error");

module.exports = ({e, res, next}) => {

    if (e instanceof NotFoundError) {
        return res.status(404).send(e.message)
    }

    if (e instanceof ServerError) {
        return res.status(500).send(e.message)
    }

    if (e instanceof BadRequest) {
        return res.status(400).send(e.message)
    }

    if (e instanceof AlreadyExist) {
        return res.status(409).send("User with provided email or username already exists.")
    }

    if (e instanceof InvalidInput) {
        return res.status(401).send("Oops, username or password is incorrect.")
    }

    return next()
}
