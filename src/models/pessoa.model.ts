import { Schema } from "mongoose";
import mongoose from 'mongoose';


export interface IPessoa {
    nome: string,
    cpf: string,
    email: string,
    genero: string,
    idade: number,
    senha: string,
    createdAt: string | Date
}

export const pessoaSchema = new Schema<IPessoa>({
    nome: {
        type: String
    }, 
    cpf: {
        type: String
    },
    email: {
        type: String
    },
    genero: {
        type: String
    },
    idade: {
        type: Number
    },
    senha: {
        type: String
    },
    createdAt: {
        type: Date,
        default : new Date()
    }

});

export const Pessoa = mongoose.model<IPessoa>('Pessoa', pessoaSchema);
