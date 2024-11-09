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
        const thought = await Thoughts.findOne({ _id: req.params.thoughtId }).select('-__v');

        if (!thought) {
            return res.status(404).json({ message: 'No Thought Found' });
        }

        res.json(thought);
        return;
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}
// create a thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.create(req.body);
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
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

        res.json(thought);
        return;
    } catch (error) {
        res.status(500).json(error);
        return;
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

        res.json({ message: 'Thought deleted successfully!' });
        return;
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}

// add a reaction to the thoughts
export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true},
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID'});
        }
        res.json(thought);
        return;
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}

// get rid of the reaction by removing the reactionId from the reaction array

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true },
        )

        if (!thought) {
            return res.status(404).json({ message: 'No thought found by this ID'});
        }

        res.json(thought);
        return;
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}