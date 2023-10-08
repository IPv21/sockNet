const mongoose = require('mongoose');



const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 2,
            max: 20,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            },
        },
        thoughts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
        }], //creates an array of thoughts
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    { timestamps: true }
);


const User = mongoose.model('User', userSchema);
module.exports = User;