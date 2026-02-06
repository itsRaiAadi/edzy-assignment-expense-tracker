import mongoose from "mongoose";
import User from "./user.model.js";

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Expense amount must be greater than 0"],
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

expenseSchema.pre("save", async function (next) {
  const userExists = await User.exists({ _id: this.userId });
  if (!userExists) {
    return next(new Error("Cannot create expense for non-existent user"));
  }
  next();
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;
