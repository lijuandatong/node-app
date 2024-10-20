const bcrypt = require('bcrypt')

async function hash(){
    const salt = await bcrypt.genSalt(10)
    console.log('salt', salt)
    const hash = await bcrypt.hash('12345', salt)
    console.log('hash', hash)
}

hash()