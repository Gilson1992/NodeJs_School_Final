import { Router } from "express";
import healthRouter from './health.router';
import pessoa from './pessoa.router';
import cardapio from './cardapio.router'

const router = Router();

router.use('/health', healthRouter);
router.use('/pessoas', pessoa);
router.use('/cardapio', cardapio)

export default router;

