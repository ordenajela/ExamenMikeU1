import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserStorageGateway } from "./user.storage.gateway";
import { GetAllUsersInteractor } from "../../../modules/use-cases/gat-all-users-interactor";

export class UserController {

    private static SECRET_KEY = process.env.JWT_SECRET || 'tuClaveSecreta';

    static async getAll(req: Request, res: Response) {
        try {
            const repository = new UserStorageGateway();
            const interactor = new GetAllUsersInteractor(repository);
            const data = await interactor.execute();
            res.status(200).json(data);
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Error" });
        }
    }

    static async authenticate(req: Request, res: Response) {
        // Lógica para autenticar y generar el token
        // ... (código existente)
    }

    static async create(req: Request, res: Response) {
        try {
            const { username, password, role, fullname, area } = req.body;

            const repository = new UserStorageGateway();
            
            // Suponiendo que tienes un método 'saveUser' en tu UserStorageGateway
            const newUser = await repository.saveUser({ username, password, role, fullname, area });

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Error creating user" });
        }
    }
}

export const userRouter = express.Router();
userRouter.get("/", [], UserController.getAll);
userRouter.post("/authenticate", [], UserController.authenticate);
userRouter.post("/create", [], UserController.create);
