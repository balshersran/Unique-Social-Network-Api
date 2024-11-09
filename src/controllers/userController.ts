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

// Get a single user
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({ _id: req.params.userId })
      .populate('Thoughts')
      .populate('Users')

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

// create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await Users.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete a user 
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json({ message: 'User deleted!' })
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

export const addFriend = async (req: Request, res: Response) => {
  try {
    const friend = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true },
    );

    if (!friend) {
      return res.status(404).json({ message: 'No user found by this ID, error adding friend'})
    }
    res.json(friend);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error adding Friend' });
    return;
  }
}

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const friend = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { userId: req.params.userId }}},
      { runValidators: true, new: true},
    )

    if (!friend) {
      return res.status(404).json({ message: 'No Friend found by this ID'})
    }

    res.json(friend);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
}