import { Request, Response, Router } from "express";
import cardapioSevices from "../services/cardapio.service";
import { autorizationMiddleware } from "../middlewares/autorization.middleware";


const router = Router();

router.get('/', autorizationMiddleware, async (req: Request, res: Response) => {
    const lanche = await cardapioSevices.getAll();
    res.send(lanche);
});

router.get('/:tipo_lanche', autorizationMiddleware, async (req: Request, res: Response) => {
    const lanche = await cardapioSevices.getByDocument(req.params.tipo_lanche);
    if (!lanche) return res.status(400).send('Pedido não encontrado');
    res.status(200).send(lanche);
});

router.post('/', autorizationMiddleware, async (req: Request, res: Response) => {
    await cardapioSevices.create(req.body);
    return res.status(201).send('Pedido incluído com Sucesso');

});

router.post('/autorization',async (req: Request, res: Response) => {
    try{
        const token = await cardapioSevices.autorization(req.body.tipo_lanche, req.body.nome);
        res.status(200).send({ token });

    }catch (error: any){
        res.status(401).send({ message: error.message});
    }
});

router.delete('/delete/:nome', autorizationMiddleware, async (req: Request, res: Response) => {
    try {
         await cardapioSevices.remove(req.params.nome);
        res.status(200).send({ message: 'Pedido Removido com Sucesso' })
    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
});

router.put('/:nome', autorizationMiddleware, async (req: Request, res: Response) => {

    try {
       await cardapioSevices.update(req.params.nome, req.body);
    } catch (error: any) {
        res.status(400).send({ message: error.message})
    }

    res.status(200).send({ message: 'Pedido Atualizado com Sucesso!' })

});

export default router