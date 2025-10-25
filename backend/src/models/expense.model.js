import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    splitAmong: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
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

    splitType: {
      type: String,
      enum: ["equal", "custom"],
      default: "equal",
    },

    shares: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: Number,
        isSettled: { type: Boolean, default: false },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "settled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", expenseSchema);
