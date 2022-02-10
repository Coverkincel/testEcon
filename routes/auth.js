const express = require('express');
const router = express.Router();

const {register, login, forgotpassword, resetpassword, getAll} = require('../controllers/auth');
const {getUser} = require('../controllers/auth');
const {updatecoins} = require('../controllers/auth');
const {updateSkippers} = require('../controllers/auth');
const {changeDoneTests} = require('../controllers/auth');


router.route("https://econbattles.herokuapp.com/register").post(register);

router.route("https://econbattles.herokuapp.com/login").post(login);

router.route("https://econbattles.herokuapp.com/forgotpassword").post(forgotpassword);

router.route("https://econbattles.herokuapp.com/resetpassword/:resetToken").put(resetpassword);

router.route('https://econbattles.herokuapp.com/getUser').get(getUser)

router.route('https://econbattles.herokuapp.com/updatecoins').put(updatecoins);

router.route('https://econbattles.herokuapp.com/updateskippers').put(updateSkippers);

router.route('https://econbattles.herokuapp.com/changedonetests').put(changeDoneTests);

router.route('https://econbattles.herokuapp.com/getall').get(getAll);

module.exports = router;