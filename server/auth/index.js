import express from 'express';
var router = express.Router();

router.use('/login', require('./local/index').default);

export default router;