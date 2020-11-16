const User = require("./../models/Admin");

exports.FindUser = async (info) => {
  User.findOne({
    $or: [
      { name: info.account },
      { phone: info.account },
      { phone: info.account },
    ],
    password: info.password,
  });
};
