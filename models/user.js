const mongoose = require('mongoose');
const User = mongoose.model('User', userSchema);

const thoughtSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            max: 200,
            trim: true,
        },
    },
        { timestamps: true }    


    );

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
        thoughts: [thoughtSchema], //creates an array of thoughts
},
    { timestamps: true }
);


module.exports = User;