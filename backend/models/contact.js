const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contactSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNum: {
      type: String,
    },
  },
  {
    collection: "contacts",
  }
);

module.exports = mongoose.model("Contact", contactSchema);
