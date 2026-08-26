import express from "express";
import { createUserHandler } from "../controllers/users.controller.js";

const authRouter = express.Router();

authRouter.post('/register', createUserHandler);

export default authRouter