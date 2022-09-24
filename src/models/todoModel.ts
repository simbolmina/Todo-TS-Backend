import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Todo", todoSchema);
