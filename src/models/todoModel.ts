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
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TodoModel", todoSchema);
