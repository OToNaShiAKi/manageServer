const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  root: {
    type: Boolean,
    default: false,
  },
});

const Admin = model("admin", schema);

module.exports = Admin;
