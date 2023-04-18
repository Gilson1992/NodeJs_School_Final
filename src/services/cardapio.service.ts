import pessoaRepository from '../repositories/pessoa.repository';
import { ICardapio, Cardapio } from '../models/cardapio.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cardapioRepository from '../repositories/cardapio.repository';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "drjkognertjghnertfkjon";



class CardapiosServices {
    getAll() {
        return cardapioRepository.getAll();
    }

    getByDocument(nome: string) {
        return cardapioRepository.getByDocument(nome);
    };

    async create(cardapio: ICardapio) {
       return cardapioRepository.create(cardapio);
    }

    async autorization(tipo_lanche: string, nome: string){
        const pedido = await pessoaRepository.getByDocument(tipo_lanche);

        if(!pedido) throw new Error('Pedido não encontrado');

        const result = await bcrypt.compare(nome, pedido.nome);

        if(result){
            return jwt.sign({ nome: pedido.nome, _id: pedido._id},jwtSecret, {
                expiresIn: '2h'
            });
        }
        
        throw new Error('Acesso Negado, falha na autorização')
    }

    remove(nome: string) {
        return cardapioRepository.remove(nome)
    }

    update(nome: string, preco: Partial<ICardapio>) {
        return cardapioRepository.update(nome, preco);
    }

};

export default new CardapiosServices();