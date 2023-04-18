import { ICardapio, Cardapio } from '../models/cardapio.model';
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

    remove(nome: string) {
        return cardapioRepository.remove(nome)
    }

    update(nome: string, cardapio: Partial<ICardapio>) {
        return cardapioRepository.update(nome, cardapio);
    }

};

export default new CardapiosServices();