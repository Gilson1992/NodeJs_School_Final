import { Schema } from "mongoose";
import mongoose from 'mongoose';


export interface ICardapio {
    tipo_lanche: string,
    nome: string,
    preco: number,
    ingredientes: string,
    createdAt: string | Date

}

export const menuSchema = new Schema<ICardapio>({
    tipo_lanche: {
        type: String
    },
    nome: {
        type: String
    },
    preco: {
        type: Number
    },
    ingredientes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

});

export const Cardapio = mongoose.model<ICardapio>('Cardapio', menuSchema);
