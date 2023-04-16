import { Request, Response, Router } from "express";
import pessoaService from "../services/pessoa.service";
import { Pessoa } from "../models/pessoa.model";


const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const pessoas = await pessoaService.getAll();
    res.send(pessoas);
});

router.get('/:cpf', async (req: Request, res: Response) => {
    const pessoa = await pessoaService.getByDocument(req.params.cpf);
    if (!pessoa) return res.status(400).send('Pessoa não encontrada');
    res.status(200).send(pessoa);
});

router.post('/', async (req: Request, res: Response) => {
    await pessoaService.create(req.body);
    return res.status(201).send('Pessoa incluída com Sucesso');

});

router.post('/autorization',async (req: Request, res: Response) => {
    try{
        const token = await pessoaService.autorization(req.body.cpf, req.body.senha);
        res.status(200).send(token);

    }catch (error: any){
        res.status(401).send({ message: error.message});
    }
});

router.delete('/delete/:cpf', async (req: Request, res: Response) => {
    try {
         await pessoaService.remove(req.params.cpf);
        res.status(200).send({ message: 'Pessoa Removida com Sucesso' })
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
});

router.put('/:cpf', async (req: Request, res: Response) => {

    try {
       await pessoaService.update(req.params.cpf, req.body);
    } catch (error: any) {
        res.status(400).send({ message: error.message})
    }

    res.status(200).send({ message: 'Pessoa Atualizado com Sucesso!' })

});

export default router