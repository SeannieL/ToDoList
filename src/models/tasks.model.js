import db from "../config/db.js";

export async function getAllTasks(userId) {
    const result = await db.query(
        'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id',
        [userId]
    );
    return result.rows;
}

export async function getTaskById(id, userId) {
    const result = await db.query(
        'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
        [id, userId]
    );
    return result.rows[0];
}

export async function createTask(title, userId) {
    const result = await db.query(
        'INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *',
        [title, userId]
    );
    return result.rows[0];
}

export async function deleteTask(id, userId) {
    const result = await db.query(
        'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
        [id, userId]
    );
    return result.rows[0];
}

export async function updateTask(id, values, userId) {
    const { title, is_done } = values;
    const result = await db.query(
        `UPDATE tasks
         SET title = COALESCE($1, title),
             is_done = COALESCE($2, is_done)
         WHERE id = $3 AND user_id = $4
         RETURNING *`,
        [title ?? null, is_done ?? null, id, userId]
    );
    return result.rows[0];
}