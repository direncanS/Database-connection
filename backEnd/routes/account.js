const express = require('express');

const accountController = require('../controllers/account');

const router = express.Router();

router.get('/user/:username', accountController.getUser);
router.get('/get-users', accountController.getAllUsers);
router.get('/get-user-with-token/:accessToken', accountController.getUserWithToken);

router.post('/login', accountController.postLogin);
router.post('/register', accountController.postRegister);
router.post('/logout', accountController.postLogout);

router.patch('/create-score', accountController.setScore);

module.exports = router;