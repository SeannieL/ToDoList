//Collections of how application responds to incoming HTTP requests

import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "../models/tasks.model.js";

export async function getAllTasksHandler(req, res){
    try{
        const result =  await getAllTasks();
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error : 'Internal Server Error'});
    }
}