//Collections of how application responds to incoming HTTP requests

import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "../models/tasks.model.js";

export async function getAllTasksHandler(req, res){
    try{
        const result = await getAllTasks(req.user.userId);
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error : 'Internal Server Error'});
    }
}

export async function getTaskByIdHandler(req, res){
    try{
        const { id } = req.params;
        const result = await getTaskById(id, req.user.userId);
        if(!result){
            return res.status(404).json({error: 'Task not found'});
        }
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error : 'Internal Server Error'});
    }
}

export async function createTaskHandler(req, res){
    const { title } = req.body;

    if(!title){
        return res.status(400).json({ error: 'Task name is required' });
    }

    try{
        const result = await createTask(title, req.user.userId);
        res.status(201).json({
            message: 'Task created successfully',
            task : result
        })
    }catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error occurred while inserting data' });
    }
}

export async function deleteTaskHandler(req, res){
    const { id } = req.params;

    try{
        const result = await deleteTask(id, req.user.userId);
        if(!result){
            return res.status(404).json({ message : 'Task not found'});
        }

        res.status(200).json({ message: 'Task successfully deleted'})
    } catch (error){
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function updateTaskHandler(req, res){
    const { id } = req.params;
    const updates = req.body;  

    if(Object.keys(updates).length === 0 ){
        return res.status(400).json({ error: 'No fields provided for update.'});
    }

    try{
        const result = await updateTask(id, updates, req.user.userId);
        if(!result){
            return res.status(404).json({ error: 'Task not found.'});
        }

        res.status(200).json(result);
    }catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}