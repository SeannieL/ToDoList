import express from "express";
import { getAllTasksHandler } from "../controllers/tasks.controller.js";

const router = express.Router();


router.get('/', getAllTasksHandler);

export default router