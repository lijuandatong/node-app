const mongoose = require('mongoose')
const config = require('config')

module.exports = function(){
    const db = config.get('db')
    mongoose.connect(db)
    .then(() => console.log(`connected to ${db}`))
    //.catch(err => console.error('could not connet to MongoDB', err)) 
    // 去掉rejection的处理，因为我们想在unhandledrejection中统一处理，记录到日志中
}