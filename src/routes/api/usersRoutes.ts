import { Router } from "express";
import { createUser, deleteUser, getSingleUser, getUsers } from "../../controllers/userController.js";
const router = Router();

// /api/users
// get all users
router.route('/').get(getUsers);
// get a single user
router.route('/').get(getSingleUser);
// create a new user
router.route('/').post(createUser);
// get a single user, delete that single user 
router.route('/:userId').get(getSingleUser).delete(deleteUser);

export { router as usersRouter };