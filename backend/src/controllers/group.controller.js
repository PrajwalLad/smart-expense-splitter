import { Group } from "../models/group.model.js";

export const createGroup = async (req, res) => {
  try {
    const { userId } = req.user;
    const { groupName, membersId } = req.body;

    if (!groupName || !membersId) {
      return res
        .status(400)
        .json({ success: false, message: "Necessary information is missing." });
    }

    const group = await Group.create({
      name: groupName,
      createdBy: userId,
      users: membersId,
    });

    return res.status(201).json({
      success: true,
      message: "Group was created successfully",
      data: group,
    });
  } catch (error) {
    console.error("Error in createGroup: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    const { userId } = req.user;
    const groups = await Group.find({
      $or: [{ createdBy: userId }, { users: userId }],
    });
    if (groups.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You do not have any groups yet.",
        data: []
      });
    }
    return res.status(200).json({
      success: true,
      message: "Group list found successfully.",
      data: groups,
    });
  } catch (error) {
    console.error("Error in listing groups: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
