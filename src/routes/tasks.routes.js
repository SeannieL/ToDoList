import express from "express";
import { getAllTasksHandler, getTaskByIdHandler , createTaskHandler, deleteTaskHandler, updateTaskHandler} from "../controllers/tasks.controller.js";

const router = express.Router();


router.get('/', getAllTasksHandler);
router.get('/:id', getTaskByIdHandler);
router.post('/', createTaskHandler);
router.delete('/:id', deleteTaskHandler);
router.patch('/:id', updateTaskHandler)

export default router