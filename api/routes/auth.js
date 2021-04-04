const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validateInput } = require('../middleware/validate-input');
const { login } = require('../controllers/auth');

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
],login );

module.exports = router;