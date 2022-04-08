const nodemailer = require('nodemailer');
const router = require('express').Router();

const userCtrl = require('../controllers/user');

router.post('/user-register',userCtrl.signup);
router.post('/user-login',userCtrl.login);
router.post('/forgot-password',userCtrl.forgotPassword);
router.post('/password-reset/:userId/:token',userCtrl.link);
router.post('/new-password',userCtrl.newPassword);
router.post('/verify-token',userCtrl.validTokenCheck);
router.get('/getUser/:userId',userCtrl.getUser);
router.put('/user-edit',userCtrl.editUser);

module.exports = router;