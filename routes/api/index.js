const router = require('express').Router();

//localhostPORT/api
const userRoutes = require("./user-routes");
router.use("/users", userRoutes)

module.exports = router;