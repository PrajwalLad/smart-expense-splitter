import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
    friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend",
      default: null,
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", expenseSchema);
