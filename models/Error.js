module.exports = {
  init: (error) => ({
    status: error.code || 1000,
    message: error.message || "服务器运行错误"
  }),
  LoginWrong: {
    status: 1001,
    message: "此用户不存在"
  },
  
};
