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
        } else if (exp.paidBy.toString() === userId && share.user.toString() !== userId) {
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
