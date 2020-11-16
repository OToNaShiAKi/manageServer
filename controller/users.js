const User = require("./../service/user");
const ErrorCode = require("./../model/Error");

const md5 = require("blueimp-md5");
const salt = ["S&T", "hustmaths"];

exports.Login = async (info) => {
  info.password = md5(salt[0] + info.password + salt[1]);
  const user = await User.FindUser(info);
  if(user)
    return {
      status: 200,
      message: "登录成功",
      data: user
    };
  else return ErrorCode.LoginWrong;
};