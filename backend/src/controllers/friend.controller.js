import { Friend } from "../models/friend.model.js";
import { User } from "../models/user.models.js";

export const addFriend = async (req, res) => {
  try {
    const { email } = req.body;

    const friendUser = await User.findOne({ email });
    if (!friendUser) {
      return res
        .status(400)
        .json({ success: false, message: "User with this email not found." });
    }

    if (friendUser._id.toString() === req.user.userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot add yourself as a friend.",
      });
    }

    const existing = await Friend.findOne({
      user: req.user.userId,
      friend: friendUser._id,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This user is already in your friends list.",
      });
    }

    const friend = await Friend.create({
      user: req.user.userId,
      friend: friendUser._id,
    });

    await Friend.create({
      user: friendUser._id,
      friend: req.user.userId,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: `Friend ${friendUser.name} was added`,
        data: friend,
      });
  } catch (error) {
    console.error("Error in addFriend: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFriends = async(req, res) => {
  try {
    const {userId} = req.user;
    const friends = await Friend.find({ user: userId }).populate("friend", "_id name email");
    if(friends.length === 0){
      return res.status(200).json({ success: true, message: "You do not have any friends yet." })
    }
    const friendArr = friends.map((el)=>el.friend);

    return res.status(200).json({
      success: true,
      message: "Friend list found successfully.",
      data: friendArr
    })
  } catch (error) {
    console.log("Error in getting friends: ", error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};
