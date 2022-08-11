const { generateToken } = require('../../../utils/generateToken');
const store = require('./store');

const createToken = (request) => {

  return new Promise((resolve, reject) => {
    try {
      if(!request || !request.headers || request.headers['private-id'] == null){
        reject("Private-id is mandatory")
      } else {
        store.findUser(request.headers['private-id'])
          .then((data)=>{
            if(!data || data.length == 0 || data == null){
              reject("User not exists")
            } else {
              try {
                var token = generateToken(data);
                resolve(token)
              } catch (error) {
                reject(error)
              }
            }
          })
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createToken
}