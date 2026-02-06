import User from "../models/User.model.js";
import Expense from "../models/Expense.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, monthlyBudget } = req.body;

  if (!name || !email || !monthlyBudget) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const user = await User.create({ name, email, monthlyBudget });
  res.status(201).json(user);
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  res.json(user);
});

export const getUserSummary = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const summary = await Expense.aggregate([
    {
      $match: {
        userId: user._id,
        date: { $gte: startOfMonth },
      },
    },
    {
      $group: {
        _id: null,
        totalExpenses: { $sum: "$amount" },
        expenseCount: { $sum: 1 },
      },
    },
  ]);

  const totalExpenses = summary[0]?.totalExpenses || 0;
  const expenseCount = summary[0]?.expenseCount || 0;

  res.json({
    totalExpenses,
    remainingBudget: user.monthlyBudget - totalExpenses,
    expenseCount,
  });
});
