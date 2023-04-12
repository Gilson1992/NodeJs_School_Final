import { Request, Response, Router } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const helloWord = { message: 'Aplicação funcionando com Sucesso'}
   res.send(helloWord);
});


router.get('/check', (req: Request, res: Response) => {
    const health = { message: 'Aplicação funcionando com Normalmente'}
   res.send(health);
})

export default router;