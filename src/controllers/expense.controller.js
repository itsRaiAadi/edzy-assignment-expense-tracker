import Expense from "../models/Expense.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.create(req.body);
  res.status(201).json(expense);
});

export const getUserExpenses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;

  const filter = { userId: req.params.id };
  if (category) filter.category = category.toLowerCase();

  const expenses = await Expense.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ date: -1 });

  res.json(expenses);
});
