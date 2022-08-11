const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./controller')

/****
 * API schemas
 * Header: private-id
 * Body: null
 * Response: #/components/schemas/token
 * Error: #/components/schemas/Error
 */
router.get('/authenticate', function (req, res){
  try{
      controller.createToken(req)
          .then((data) => {
              if(data){

                  response.success(req, res, {token: data});
              } else {
                  response.error(req, res, 200, "Error");   
              }
          })
          .catch((message) => {
              response.error(req, res, 400, message);
          });
  }catch (err) {
      response.error(req, res, 500, err)
  }
  
})

module.exports = router;