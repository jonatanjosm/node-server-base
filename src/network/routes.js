
const authentication = require('../components/business/authorization/network')
const sms = require('../components/business/sms/network')
const email = require('../components/business/email/network')

const routes = (server) => {
  // Api Version 1
  server.use('/api/v1/authentication', authentication);
  server.use('/api/v1/sms', sms);
  server.use('/api/v1/email', email);
}

module.exports = routes