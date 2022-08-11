const { userModel } = require("../../models/UserModel");
const mongoose = require('mongoose');

async function findUser (userId) {
  /* let filter = {
      "_id": { $eq:  `${mongoose.Types.ObjectId(userId)}` }
  }
  try {
    const user = await userModel.find( filter );
    return user;
  } catch (error) {
    console.error(error)
    return null;
  } */
  return {data: "ok"}
};


module.exports = {
  findUser
}