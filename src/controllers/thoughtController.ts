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
