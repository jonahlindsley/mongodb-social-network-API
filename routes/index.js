const router = require('express').Router();
const user_routes = require('./user_routes');
const thoughts_routes = require('./thoughts_routes');

router.use('/users', user_routes);
router.use('/thoughts', thoughts_routes);

module.exports = router;
