const router = require("express").Router();

const login = require('../controllers/entry/login')
const register = require('../controllers/entry/register')
const logout = require('../controllers/entry/logout')


router.post('/login',login)
router.post('/register',register)
router.post('logout',logout)




module.exports = router