import express from "express";
import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
