import { Router } from 'express';
import { getThoughts } from '../../controllers/thoughtController.js';
const router = Router();

router.route('/').get(getThoughts);

export { router as thoughtsRouter} ;