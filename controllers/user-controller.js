const User = require('../models/user');

module.exports = {
    getUsers(req, res) {
        console.log("Getting users!")
        res.json("Got users!")
    },
createUser(req,res){
    console.log("Create users!")
    res.json("Create users!")
}
}