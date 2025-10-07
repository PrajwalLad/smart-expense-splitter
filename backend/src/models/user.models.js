import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    length: 40
  },
  contact_no: {
    type: Number,
    length: 10
  },
  profile_pic: {
    type: String
  }
});

export const User = mongoose.model("User", userSchema);
