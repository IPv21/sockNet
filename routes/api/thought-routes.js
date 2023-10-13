const router = require('express').Router();
const {getThoughts, getOneThought, createOneThought, deleteThought} = require('../../controllers/thought-controllers');
const {createOneReaction, deleteOneReaction} = require('../../controllers/thought-controllers');
router.route("/").get(getThoughts);
router.route("/").post(createOneThought);


router.route("/:thoughtId").get(getOneThought);
// router.route("/:thoughtId").put(updateOneThought);
router.route('/thoughts/:thoughtId').delete(deleteThought);



router.route("/:thoughtId/reactions").post(createOneReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteOneReaction);

module.exports = router;