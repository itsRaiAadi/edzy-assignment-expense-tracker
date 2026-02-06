import express from "express";
import {
  createUser,
  getUser,
  getUserSummary,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.get("/:id/summary", getUserSummary);

export default router;
