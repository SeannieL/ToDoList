//Modal contains methods for db operation
import db from "../config/db.js";
export async function getAllTasks(){
    const result = await db.query('SELECT * FROM tasks ORDER BY id')
    return result.rows;
}

export async function getTaskById(id){
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id])
    return result.rows[0];
}

export async function createTask(title){
    const result = await db.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [title]);
    return result.rows[0];
}

export async function deleteTask(id){
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
}

export async function updateTask(id, values) {
    const { title, is_done } = values;
    const result = await db.query(
        `UPDATE tasks
         SET title = COALESCE($1, title),
             is_done = COALESCE($2, is_done)
         WHERE id = $3
         RETURNING *`,
        [title ?? null, is_done ?? null, id]
    );

    return result.rows[0];
}