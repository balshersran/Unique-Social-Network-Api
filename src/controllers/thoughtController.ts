import { Request, Response } from 'express';
// import thoughts and users schemas from models
import { Thoughts, Users } from '../models/index.js';

// get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thoughts.find();
        return res.json(thoughts)
    } catch (error) {
        return res.status(500).json(error);
    }
}
// get a single thought
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findById(req.params.thoughtId);

        if (!thought) {
            return res.json({ message: 'No thought found' });
        }

        return res.json(thought);
    } catch (error) {
        return res.status(500).json(error);
    }
}
// create a thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.create(req.body);
        return res.json(thought);
    } catch (error) {
        return res.status(500).json(error);
    }
}
// update a thought 
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' })
        }

        return res.json(thought);
    } catch (error) {
        return res.status(500).json(error);
    }
}
// delete a thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' })
        }

        const user = await Users.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true },
        );

        if (!user) {
            return res.status(404).json({ message: 'Thought created but no user with this ID' });
        }

        return res.json({ message: 'Thought deleted successfully!' });
    } catch (error) {
        return res.status(500).json(error);
    }
}

// add a reaction to the thoughts
export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true },
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json(thought);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// get rid of the reaction by removing the reactionId from the reaction array

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true },
        )

        if (!thought) {
            return res.status(404).json({ message: 'No thought found by this ID' });
        }

        return res.json(thought);
    } catch (error) {
        return res.status(500).json(error);
    }
}