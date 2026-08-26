import { createUser } from "../models/users.model.js";
import bcrypt from 'bcrypt';


export async function createUserHandler(req, res) {
    const { email, username, password } = req.body;
    const saltRounds = 10;

    if (!email || !username || !password) {
    return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    try {
        let hash = await bcrypt.hash(password, saltRounds);
        const result = await createUser(email, username, hash);
        res.status(201).json({
            message: 'User created successfully',
            user : result
        })
    }catch (err) {
        if (err.code === '23505') {
        return res.status(409).json({ error: 'Email or username already taken' });
        }
        console.error(err.message);
        res.status(500).json({ error: 'Server error occurred while inserting data' });
    }
}