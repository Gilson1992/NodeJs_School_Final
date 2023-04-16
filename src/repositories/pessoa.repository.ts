import { Pessoa, IPessoa } from "../models/pessoa.model";


class PessoaRepository{
    getAll(){
        return Pessoa.find();
    }

    getByDocument(cpf: string){
        return Pessoa.findOne({ cpf: cpf })
    }

    create(pessoa: IPessoa){
        return Pessoa.create(pessoa);
    }

    update(cpf: string, pessoa: Partial<IPessoa>){
        return Pessoa.updateOne({ cpf: cpf }, { $set: pessoa });
    }

    remove(cpf: string){
        return Pessoa.deleteOne({ cpf: cpf });
    }
}

export default new PessoaRepository();