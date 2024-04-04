const NotFoundError = require("../errors/not.found.error");

module.exports = ({e, res, next}) => {
    if (e instanceof NotFoundError) {
        return res.status(404).send("Not found")
    }

    console.error(e)

    return next()
}
