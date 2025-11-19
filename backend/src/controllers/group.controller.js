import { Group } from "../models/group.model.js";
import {Expense} from "../models/expense.model.js"

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

export const getGroupDetails = async (req, res) => {
  try {
    const {userId} = req.user;
    const { id } = req.params;

    const groupInfo = await Group.findById(id).populate("users", "name email");

    if (!groupInfo) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    const expenses = await Expense.find({ group: id })
      .populate("paidBy", "name email")
      .populate("createdBy", "name email")
      .populate("splitAmong", "name email")
      .populate("shares.user", "name email")
      .sort({ createdAt: 1 });
    
    const notInvolvingMe = [];
    const paidByMe = [];
    const oweByMe = [];

    expenses.forEach(exp => {
      const meInSplit = exp.splitAmong.some(u => u._id.equals(userId));
      const meInShares = exp.shares.some(s => s.user._id.equals(userId));

      const isComplete = exp.shares.every(s => s.isSettled);
      const myShare = exp.shares.find(s => s.user._id.equals(userId));

      if (!meInSplit && !meInShares) {
        notInvolvingMe.push({
          ...exp._doc,
          isComplete,
          myStatus: "not-involved"
        });
        return;
      }

      if (exp.paidBy._id.equals(userId)) {
        const pendingUsers = exp.shares.filter(s => !s.isSettled);

        paidByMe.push({
          ...exp._doc,
          isComplete,
          pendingUsers,
          myStatus: pendingUsers.length === 0 ? "complete" : "others-pending"
        });

        return;
      }

      if (meInShares) {
        oweByMe.push({
          ...exp._doc,
          isComplete,
          hasPaid: myShare.isSettled,
          myStatus: myShare.isSettled
            ? (isComplete ? "complete" : "others-pending")
            : "pending"
        });
        return;
      }
    });

    res.status(200).json({
      success: true,
      group: groupInfo,
      expenses: {
        notInvolvingMe,
        myExpenses: {
          paidByMe,
          oweByMe
        }
      }
    });

  } catch (error) {
    console.log("Error in group details: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

