import db from "../config/db.js"

export async function createUser(email, username, passwordHash){
   const result = await db.query('INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING *', [email, username, passwordHash]);
   return result.rows[0];
}

export async function findUserByUsername(username){
   const result = await db.query('SELECT * FROM users WHERE username = $1', [username])
   return result.rows[0];
}