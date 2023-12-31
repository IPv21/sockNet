const User = require('../models/user');
// const Friends = require('../models/friends');
const { ObjectId } = require("mongoose").Types;
const Thought = require('../models/thought'); // Adjust the path to match your project structure


module.exports = {
    // Find all users
    getUsers(req, res) {
        User.find().select('-__v').then(async (users) => {
            console.log("<<<Getting users!>>>")
            res.json(users)
        })
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Get a user by id
    getUserById({params}, res) {
        User.findOne({_id: params.id}).select('-__v').then(async (user) => {
            if(!user) {
                res.status(404).json({message: '<<<User ID not Found>>>'});
                return;
            }
            res.json(user)
        })
    },
    // Update a user by id
  updateUser(req, res) {
    User.findByIdAndUpdate(
      new ObjectId(req.params.userId),
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "<<<User ID not Found>>>" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

    // Delete one user and remove their thoughts
    async deleteOneUser(req, res) {
        try {
            const user = await User.findOneAndRemove({
                _id: (req.params.userId)
            });
            console.log('<<<User Ceases to Exist>>>')

            if (user) {
                // Delete all thoughts from user
                const thoughts = await Thought.deleteMany({ username: user.username });
            } else {
                res.status(404).json({ message: "No such user exists" });
            }
            res.json({ message: "<<<User successfully deleted>>>" });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Add a friend to a user
async createFriend (req, res) {
    try {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!friend) {
            res.status(404).json({ message: '<<<Friend ID not Found>>>' });
            return;
        }
        res.json(friend);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},


// Delete a friend from a user
async deleteFriend(req, res) {
try {
    const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
    );
    if (!friend) {
        res.status(404).json({ message: '<<<Friend ID not Found>>>' });
        return;
    }
    res.json(friend);
}
catch (err) {
    console.log(err);
    res.status(500).json(err);
}
}
}



