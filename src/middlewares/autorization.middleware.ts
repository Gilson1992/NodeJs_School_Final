import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "";

export function autorizationMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).send({ message: 'Autenticação Negada' })
    }
    const tokenSplited = token?.split('Bearer ');

    const pessoaToken = jwt.verify(tokenSplited[1], jwtSecret);

    if(!pessoaToken) return res.status(401).send({ message: 'Acesso Negado' })

    next();
}
