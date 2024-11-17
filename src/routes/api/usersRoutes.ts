import { Router } from "express";
import { addFriend, createUser, deleteFriend, deleteUser, getSingleUser, getUsers } from "../../controllers/userController.js";
const router = Router();

// /api/users
// get all users
router.route('/').get(getUsers).post(createUser);

// get a single user, delete that single user 
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// make a route to add friends
router.route('/:userId/friends/:friendId').put(addFriend);

// make a route to delete a friend
router.route('/:userId/friends/:friendId').delete(deleteFriend);

export { router as usersRouter };