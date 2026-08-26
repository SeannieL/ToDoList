import express from "express";
import { getAllTasksHandler, getTaskByIdHandler , createTaskHandler, deleteTaskHandler, updateTaskHandler} from "../controllers/tasks.controller.js";

const taskRouter = express.Router();


taskRouter.get('/', getAllTasksHandler);
taskRouter.get('/:id', getTaskByIdHandler);
taskRouter.post('/', createTaskHandler);
taskRouter.delete('/:id', deleteTaskHandler);
taskRouter.patch('/:id', updateTaskHandler)

export default taskRouter