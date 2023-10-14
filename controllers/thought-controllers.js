const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');
const Thought = require('../models/thought');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    createOneThought(req, res) {
        Thought.create(req.body)
          .then(async function (thought) {
            await User.findOneAndUpdate(
              { username: req.body.username },
              { $addToSet: { thoughts: new ObjectId(thought._id) } }, // Use new ObjectId here
              { runValidators: true, new: true }
            );
            res.json(thought);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
    

      async deleteThought(req, res) {
        try {
          const thought = await Thought.findByIdAndRemove(req.params.thoughtId);
    
          if (thought) {
            const user = await User.updateOne(
              { username: thought.username },
              {
                $pull: { thoughts: ObjectId(req.params.thoughtId) },
              }
            );
    
            if (user.nModified === 0) {
              return res.status(404).json({ message: 'User not found or no modifications made' });
            }
          } else {
            return res.status(404).json({ message: 'No thought exists!' });
          }
    
          return res.status(200).json({ message: 'Thought successfully deleted!' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
        
          // create a reaction
          createOneReaction(req, res) {
            Thought.findByIdAndUpdate(
              ObjectId(req.params.thoughtId),
              {
                $addToSet: {
                  reactions: {
                    reactionBody: req.body.reactionBody,
                    username: req.body.username,
                  },
                },
              },
              { runValidators: true, new: true, returnDocument: "After" }
            )
              .then((thought) =>
                !thought
                  ? res.status(404).json({ message: `<<<No thought found by ID>>>` })
                  : res.json(thought)
              )
              .catch((err) => res.status(500).json(err));
          },
        
          // delete a reaction
          async deleteOneReaction(req, res) {
            try {
              // Find the thought
              const thought = await Thought.findById(ObjectId(req.params.thoughtId));
        
              // Get the reaction you want to delete
              const result = thought.reactions.find(
                (reaction) => reaction.reactionId == req.params.reactionId
              );
        
              // Delete the reaction from the reactions array
              thought.reactions.remove(result);
        
              // Save the thought
              thought.save();
        
              res.json(thought);
            } catch (err) {
              res.status(500).json(err);
            }
          },
        };

