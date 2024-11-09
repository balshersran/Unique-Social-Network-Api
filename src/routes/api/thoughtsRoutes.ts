import { Router } from 'express';
import { addReaction, createThought, deleteThought, getSingleThought, getThoughts, removeReaction, updateThought } from '../../controllers/thoughtController.js';
const router = Router();

// /api/thoughts
// get all thoughts
router.route('/').get(getThoughts);
// get a single thought
router.route('/:thoughtID').get(getSingleThought);
// create a thought
router.route('/').post(createThought);
// update a thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought);
// delete a thought and update user with that deleted thought
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// add route for updating a reaction to thought
router.route('/:thoughtId/reaction').post(addReaction);

// remove a reaction route
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);


export { router as thoughtsRouter} ;