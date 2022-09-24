import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: String,
  id: Math.random().toString(36).substring(2, 6),
});
