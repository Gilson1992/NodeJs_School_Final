import { Router } from "express";
import healthRouter from './health.router'
import pessoa from './pessoa.router'

const router = Router();

router.use('/health', healthRouter);
router.use('/pessoas', pessoa);

export default router;

