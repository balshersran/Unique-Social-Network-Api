import { Router } from "express";
import { createUser, deleteUser, getSingleUser, getUsers } from "../../controllers/userController.js";
const router = Router();

router.route('/').get(getUsers);
router.route('/').get(getSingleUser);
router.route('/').post(createUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser);

export { router as usersRouter };