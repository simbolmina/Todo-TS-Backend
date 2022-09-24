import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlenght: 4,
  },
  todos: [{ type: mongoose.Types.ObjectId, ref: "Todo" }],
  role: String,
});

//check if new users email is unique;
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
