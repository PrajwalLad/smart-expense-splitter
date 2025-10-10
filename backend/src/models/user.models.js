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
    maxlength: 40
  },
  contact_no: {
    type: String,
    match: /^\d{10}$/
  },
  profile_pic: {
    type: String
  },
  isOnboarded: {
    type: Boolean,
    default: false
  }
});

export const User = mongoose.model("User", userSchema);
