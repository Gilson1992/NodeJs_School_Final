import pessoaRepository from '../repositories/pessoa.repository';
import { IPessoa, Pessoa } from '../models/pessoa.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "drjkognertjghnertfkjon";



class PessoasServices {
    getAll() {
        return pessoaRepository.getAll();
    }

    getByDocument(cpf: string) {
        return pessoaRepository.getByDocument(cpf);
    };

    async create(pessoa: IPessoa) {
        if(pessoa.senha){
            pessoa.senha = await bcrypt.hash(pessoa.senha, 10);
        }
        return pessoaRepository.create(pessoa);
    }

    async autorization(cpf: string, senha: string){
        const pessoa = await pessoaRepository.getByDocument(cpf);

        if(!pessoa) throw new Error('Pessoa não encontrada');

        const result = await bcrypt.compare(senha, pessoa.senha);

        if(result){
            return jwt.sign({ cpf: pessoa.cpf, _id: pessoa._id},jwtSecret, {
                expiresIn: '2h'
            });
        }
        
        throw new Error('Acesso Negado, falha na autorização')
    }

    remove(cpf: string) {
        return pessoaRepository.remove(cpf)
    }

    update(cpf: string, pessoa: Partial<IPessoa>) {
        return pessoaRepository.update(cpf, pessoa);
    }

};

export default new PessoasServices();