import { Router } from 'express';
import { createThought, getSingleThought, getThoughts } from '../../controllers/thoughtController.js';
const router = Router();

router.route('/').get(getThoughts);
router.route('/').get(getSingleThought);
router.route('/').post(createThought);


export { router as thoughtsRouter} ;