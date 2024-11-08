import { Request, Response } from 'express';
import { Thoughts } from '../models/index.js';


export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thoughts.find();
        return res.json(thoughts)
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOne({ _id: req.params.thoughtId }).select('-__v');

        if (!thought) {
            return res.status(404).json({ message: 'No Thought Found'});
        }

        res.json(thought);
        return;
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.create(req.body);
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
}