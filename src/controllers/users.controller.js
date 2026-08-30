import { createUser, findUserByUsername } from "../models/users.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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

export async function loginUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const result = await findUserByUsername(username);

        if (!result) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // verify password against stored hash
        const isMatch = await bcrypt.compare(password, result.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // password correct → issue token (minimal payload, env secret)
        //This will be in req.user when doing jwt.verify
        const token = jwt.sign(
            { userId: result.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            data: {
                userId: result.id,
                email: result.email,
                token: token,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}
