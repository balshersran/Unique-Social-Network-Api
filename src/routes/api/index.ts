import { Router } from 'express';
// import { thoughtsRouter } from './thoughtsRoutes';
import { usersRouter } from './usersRoutes.js';


const router = Router();

router.use('/users', usersRouter);
// router.use('/thoughts', thoughtsRouter );

export default router;