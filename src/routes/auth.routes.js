import express from "express";
import { createUserHandler, loginUser } from "../controllers/users.controller.js";

const authRouter = express.Router();

authRouter.post('/register', createUserHandler);
authRouter.post('/login', loginUser)

export default authRouter