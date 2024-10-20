const config = require('config')

module.exports = function(){
    // 没有配置这个密钥就退出系统
    if(!config.get('jwtPrivateKey')){
        throw new Error('jwtPrivateKey does not exit.')
    }
}