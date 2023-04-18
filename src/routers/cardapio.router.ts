import { Request, Response, Router } from "express";
import cardapioSevices from "../services/cardapio.service";

const router = Router();

// Ler/Exibir todo o cardápio
router.get('/', async (req: Request, res: Response) => {
    const lanche = await cardapioSevices.getAll();
    res.send(lanche);
});

// Listar o Documento por tipo de lanche
router.get('/:tipo_lanche', async (req: Request, res: Response) => {
    const lanche = await cardapioSevices.getByDocument(req.params.tipo_lanche);
    if (!lanche) return res.status(400).send('Pedido não encontrado');
    res.status(200).send(lanche);
});

// Criar um item para o cardápio 
router.post('/', async (req: Request, res: Response) => {
    await cardapioSevices.create(req.body);
    return res.status(201).send('Pedido incluído com Sucesso');

});

// Deletar um item do cardapio
router.delete('/delete/:nome', async (req: Request, res: Response) => {
    try {
        await cardapioSevices.remove(req.params.nome);
        res.status(200).send({ message: 'Pedido Removido com Sucesso' })
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
});

// Atualizar o item do cardapio
router.put('/:nome', async (req: Request, res: Response) => {

    try {
        await cardapioSevices.update(req.params.nome, req.body);
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }

    res.status(200).send({ message: 'Pedido Atualizado com Sucesso!' })

});

export default router