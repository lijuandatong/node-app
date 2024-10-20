const logger = require('../startup/log')

module.exports = function (err, req, res, next) {
    //logger.error(err.message)

    res.status(500).send('something failed.')
}