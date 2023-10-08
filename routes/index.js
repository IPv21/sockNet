const router = require('express').Router();

//localhost:PORT/
const apiRoutes = require("./api");
router.use("/api", apiRoutes)
module.exports = router;