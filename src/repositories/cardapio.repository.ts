import { Cardapio, ICardapio } from "../models/cardapio.model";


class CardapioRepository {
    getAll() {
        return Cardapio.find();
    }

    getByDocument(tipo_lanche: string) {
        return Cardapio.findOne({ tipo_lanche: tipo_lanche })
    }

    create(cardapio: ICardapio) {
        return Cardapio.create(cardapio);
    }

    update(nome: string, cardapio: Partial<ICardapio>) {
        return Cardapio.updateOne({ nome: nome }, { $set: cardapio });
    }

    remove(nome: string) {
        return Cardapio.deleteOne({ nome: nome });
    }
}

export default new CardapioRepository();