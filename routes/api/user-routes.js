
const router = require('express').Router();
const {getUsers, createUser, deleteOneUser, updateUser} = require('../../controllers/user-controller');
//localhostPORT/api/users
router.route('/').get(getUsers).post(createUser);
router.route('/').post(createUser);
router.route("/:userId").delete(deleteOneUser);
router.route("/;userId").put(updateUser);

//router.route("/:userId/friends").post(createOneFriend);
//router.route("/:userId/friends/:friendId").delete(deleteOneFriend);

module.exports = router;