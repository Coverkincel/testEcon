const express = require('express');
const router = express.Router();

const {register, login, forgotpassword, resetpassword, getAll} = require('../controllers/auth');
const {getUser} = require('../controllers/auth');
const {updatecoins} = require('../controllers/auth');
const {updateSkippers} = require('../controllers/auth');
const {changeDoneTests} = require('../controllers/auth');


router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route('/getUser').get(getUser)

router.route('/updatecoins').put(updatecoins);

router.route('/updateskippers').put(updateSkippers);

router.route('/changedonetests').put(changeDoneTests);

router.route('/getall').get(getAll);

module.exports = router;