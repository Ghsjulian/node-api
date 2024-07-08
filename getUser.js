const User = require('./models/Users');

const getUsers = async () => {
  try {
    const users = await User.find().exec();
    console.log(users)
  } catch (err) {
    console.log(err)
  }
};

getUsers();
module.exports = getUsers;
