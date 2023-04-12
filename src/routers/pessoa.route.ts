import { Request, Response, Router } from "express";

const router = Router();

const pessoas = [{

    id: 1,
    nome: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    genero: 'Masculino',
    idade: 28,
    senha: "Senha1!"
},
{
    id: 2,
    nome: 'Maria Santos',
    cpf: '987.654.321-11',
    email: 'maria.santos@email.com',
    genero: 'Feminino',
    idade: 35,
    senha: 'Abcdefg123'
},
{
    id: 3,
    nome: 'Pedro Oliveira',
    cpf: '456.789.123-22',
    email: 'pedro.oliveira@email.com',
    genero: 'Masculino',
    idade: 22,
    senha: '987654'
},
{
    id: 4,
    nome: 'Ana Pereira',
    cpf: '789.123.456-33',
    email: 'ana.pereira@email.com',
    genero: 'Feminino',
    idade: 40,
    senha: 'P@ssword'
},
{
    id: 5,
    nome: 'Carlos Santos',
    cpf: '987.654.321-44',
    email: 'carlos.santos@email.com',
    genero: 'Masculino',
    idade: 50,
    senha: 'Qwerty123'
}];

router.get('/', (req: Request, res: Response) => {
    res.send(pessoas);
});

router.get('/:cpf', (req: Request, res: Response) => {
    const pessoa = pessoas.find((pess) => pess.cpf === req.params.cpf);
    if(!pessoa) return res.status(400).send('Pessoa não encontrada');
    res.status(200).send(pessoa);
});

router.post('/', (req: Request, res: Response) => {
    pessoas.push(req.body);
    res.status(201).send('Pessoa incluída com Sucesso');

});

router.delete('/delete/:cpf', (req: Request, res: Response) => {
    const pessoaIndex = pessoas.findIndex((pessoas) => pessoas.cpf === req.params.cpf)
    if (pessoaIndex === -1) {
        return res.status(400).send({ message: 'Pessoa não Encontrada' });
    }
    pessoas.splice(pessoaIndex, 1);
    res.status(200).send({ message: 'Pessoa Removida com Sucesso' });
});

router.put('/:cpf', (req: Request, res: Response) => {
    const pessoaIndex = pessoas.findIndex((pessoas) => pessoas.cpf === req.params.cpf)
    if (pessoaIndex === -1) {
        res.status(400).send({ message: 'Pessoa não Encontrada!' });
    }
    pessoas[pessoaIndex] = req.body;
    res.status(200).send({ message: 'Pessoa Atualizado com Sucesso!' })

});

export default router