const router = require('express').Router();

//localhostPORT/api
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
router.use("/users", userRoutes)
router.use("/thoughts", thoughtRoutes)

module.exports = router;