const winston = require('winston')
// require('winston-mongodb')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        // write errors to console too
        new winston.transports.Console({format: winston.format.simple(), level:'error'}),
        new winston.transports.File({ filename: 'logfile.log'})
    ]
})


function initLog(){
    process.on('uncaughtException', (ex) => {
        logger.error(ex.message)
        process.exit(1)
    })
    
    process.on('unhandledRejection', (ex) => {
        logger.error(ex.message)
        process.exit(1)
    })
    
    // const MongoClient = require('mongodb').MongoClient;
    // const url = "mongodb://localhost/movies";
    
    // const client = new MongoClient(url);
    // await client.connect();
    
    // const transportOptions = {
    //   db: await Promise.resolve(client),
    //   collection: 'log'
    // };
    
    // logger.add(new winston.transports.MongoDB(transportOptions));
    return logger
}



module.exports = logger
// module.exports = initLog