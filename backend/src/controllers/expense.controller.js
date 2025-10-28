import { Expense } from "../models/expense.model.js";

export const createExpense = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      description,
      amount,
      paidBy,
      splitAmong,
      groupId,
      friendId,
      splitType,
      shares,
    } = req.body;

    if (!description || !amount || !splitAmong?.length) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    if (!req.body.friendId && !req.body.groupId) {
      return res.status(400).json({
        success: false,
        message: "Either friend or group must be provided.",
      });
    }

    let finalShares = shares;
    if (splitType === "equal") {
      const equalAmount = (amount / splitAmong.length).toFixed(2);
      finalShares = splitAmong.map((id) => ({
        user: id,
        amount: equalAmount,
      }));
    }

    const expense = await Expense.create({
      description,
      amount,
      createdBy: userId,
      paidBy,
      splitAmong,
      group: groupId || null,
      friend: friendId || null,
      splitType,
      shares: finalShares,
    });

    return res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    console.error("Error in creating expense: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSummary = async (req, res) => {
  try {
    const { userId } = req.user;
    const expenses = await Expense.find({
      $or: [{ paidBy: userId }, { splitAmong: userId }],
      status: "pending",
    });

    if (expenses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You have not added any expenses yet.",
      });
    }

    let youOwe = 0;
    let owedToYou = 0;

    for (const exp of expenses) {
      for (const share of exp.shares) {
        if (share.isSettled) {
          continue;
        }
        if (
          share.user.toString() === userId &&
          exp.paidBy.toString() !== userId
        ) {
          youOwe += share.amount;
        } else if (
          exp.paidBy.toString() === userId &&
          share.user.toString() !== userId
        ) {
          owedToYou += share.amount;
        }
      }
    }

    return res.status(200).json({
      success: true,
      data: { youOwe, owedToYou },
    });
  } catch (error) {
    console.error("Error fetching summary: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const friendsSummary = async (req, res) => {
  try {
    const { userId } = req.user;
    const expenses = await Expense.find({
      $or: [{ paidBy: userId }, { splitAmong: userId }],
      group: null,
      status: "pending",
    }).populate("friend", "name _id");

    if (expenses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You dont have any pending expenses.",
      });
    }

    const friendMap = {};

    for (const exp of expenses) {
      for (const share of exp.shares) {
        const friendId = exp.friend._id;
        const friendName = exp.friend.name;
        if (share.isSettled) {
          continue;
        }

        const shareUserId = share.user.toString();

        if (shareUserId === userId && exp.paidBy.toString() !== userId) {
          friendMap[friendId] = friendMap[friendId] || {
            name: friendName,
            youOwe: 0,
            owedToYou: 0,
          };
          friendMap[friendId].youOwe += share.amount;
        } else if (exp.paidBy.toString() === userId && shareUserId !== userId) {
          friendMap[shareUserId] = friendMap[shareUserId] || {
            name: friendName,
            youOwe: 0,
            owedToYou: 0,
          };
          friendMap[shareUserId].owedToYou += share.amount;
        }
      }
    }

    let totalYouOwe = 0;
    let totalOwedToYou = 0;

    for (const friend of Object.values(friendMap)) {
      totalYouOwe += friend.youOwe;
      totalOwedToYou += friend.owedToYou;
    }

    const friendsSummary = Object.keys(friendMap).map((id) => ({
      friendId: id,
      name: friendMap[id].name,
      ...friendMap[id],
    }));

    if (friendsSummary.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You dont have any pending expenses.",
      });
    }

    return res.status(200).json({
      success: true,
      data: { totalYouOwe, totalOwedToYou, friends: friendsSummary },
      message: "Friends summary fetched successfully",
    });
  } catch (error) {
    console.error("Error in fetching friends summary: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const groupsSummary = async (req, res) => {
  try {
    const { userId } = req.user;
    const expenses = await Expense.find({
      $or: [{ paidBy: userId }, { splitAmong: userId }],
      group: { $ne: null },
      status: "pending",
    }).populate("group", "name _id");

    if (expenses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You dont have any pending expenses.",
      });
    }

    const groupsMap = {};

    for (const exp of expenses) {
      for (const share of exp.shares) {
        const groupId = exp.group._id.toString();
        const groupName = exp.group.name;

        if (share.isSettled) {
          continue;
        }

        const shareUserId = share.user.toString();

        if (shareUserId === userId && exp.paidBy.toString() !== userId) {
          groupsMap[groupId] = groupsMap[groupId] || {
            name: groupName,
            youOwe: 0,
            owedToYou: 0,
          };
          groupsMap[groupId].youOwe += share.amount;
        } else if (exp.paidBy.toString() === userId && shareUserId !== userId) {
          groupsMap[groupId] = groupsMap[groupId] || {
            name: groupName,
            youOwe: 0,
            owedToYou: 0,
          };
          groupsMap[groupId].owedToYou += share.amount;
        }
      }
    }

    let totalYouOwe = 0;
    let totalOwedToYou = 0;

    for (const group of Object.values(groupsMap)) {
      totalYouOwe += group.youOwe;
      totalOwedToYou += group.owedToYou;
    }

    const groupsSummary = Object.keys(groupsMap).map((id) => ({
      groupId: id,
      name: groupsMap[id].name,
      ...groupsMap[id],
    }));

    if (groupsSummary.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You dont have any pending expenses.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        totalYouOwe,
        totalOwedToYou,
        groups: groupsSummary,
      },
      message: "Groups summary fetched successfully",
    });
  } catch (error) {
    console.error("Error in fetching groups summary: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
