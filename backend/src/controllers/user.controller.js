import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const createUser = async (req, res) => {
  try {
    const { email, inputPassword } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(inputPassword, 10);

    const user = new User({
      email: email,
      password: hashedPassword,
    });

    await user.save();

    const token = generateToken(user);

    const userObj = user.toObject();

    delete userObj.password;
    res.status(201).json({
      success: true,
      data: userObj,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist or invalid email Id",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = generateToken(user);

    const userObj = user.toObject();

    delete userObj.password;
    res.status(201).json({
      success: true,
      data: userObj,
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Error in logging in ", error.message);
  }
};

export const completeDetails = async (req, res) => {
  try {
    const { name, contact } = req.body;
    const { userId, email } = req.user;

    if (!name || !contact) {
      return res.status(400).json({
        success: false,
        message: "Name and contact are required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, contact_no: contact, isOnboarded: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = generateToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      data: userObj,
      token,
      message: `Details are saved successfully for ${name}`,
    });
  } catch (error) {
    console.error("Error in completeDetails:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }
    const userObj = user.toObject();
    delete userObj.password;
    return res.status(200).json({ success: true, data: userObj });
  } catch (error) {
    console.error("Error in getUser:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name, email, contact_no } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      name,
      email,
      contact_no
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }
    const userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({
      success: true,
      message: "User has been updated successfully",
      data: userObj
    })
  } catch (error) {
    console.log("Error in updating user: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
