// import { Thoughts , Users } from '../models/index.js';
import { Request, Response } from 'express';
import { Users } from '../models/index.js'


  // Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await Users.find();
      return res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

//   // Get a single user
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await Users.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

//   // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await Users.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

//   // Delete a user and associated apps
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await Users.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

//       await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

