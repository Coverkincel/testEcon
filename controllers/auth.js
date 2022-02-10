const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');


exports.getUser = async (req,res,next) => {
    const email = req.query.email;
    try {
        const user = await User.findOne({email});
        if (!user) {
            console.log('not found');
            return next(new ErrorResponse("Пользователь не найден", 404));
        } else {
            console.log('found')
            console.log(user)
            res.status(200).json({success: true, data: user});
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }

    
}

exports.getAll = async (req,res,next) => {
    console.log('getall')

    try {
        const users = await User.find({});
        if (!users) {
            console.log('not found');
            return next(new ErrorResponse("Пользователи не найден", 404));
        } else {
            console.log('users have been found')
            console.log('sending data: ', users);
            res.status(200).json({success: true, data: users});
        }
    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


exports.register = async (req, res, next) => {
const {username, email, password} = req.body;

try {
    const user = await User.create({
        username, email, password, coins: 100, doneTests: 0, skippers:0,corrects:0
    })

    sendToken(user, 201, res)
} catch (error) {
    res.status(500).json({
        success: false,
        error: error.message
    })
}
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return next(new ErrorResponse ("Пожалуйста, введите логин и пароль", 400))
    }

    try {
        const user = await User.findOne({email}).select("+password");
        if (!user) {
            return next(new ErrorResponse ("Неверные данные", 404))
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(new ErrorResponse ("Неверные данные", 401))
        }

        sendToken(user, 200, res)
    } catch(error) {
        next(error)
    }
    }

exports.forgotpassword = async (req, res, next) => {
        const {email} = req.body;

        try {
            const user = await User.findOne({email});

            if (!user) {
                return next(new ErrorResponse("Email could not be sent", 404))
            }
        
        const resetToken = user.getResetPasswordToken()

            await user.save();

        const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

        const message = `
        <h1>Вы запросили восстановление пароля</h1>
        <p>Пожалуйста, перейдите по ссылке для восстановления пароля</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl} </a>
        `
        try {
            await sendEmail({
                to: user.email,
                subject: "Восстановление пароля Econbattles",
                text: message
            })

        res.status(200).json({success: true, data: "Email sent"})
        } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new ErrorResponse("Письмо не может быть отправлено", 500))
        }

        } catch(error) {
            next(error)
        }
        }

exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");


    try {
const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt: Date.now()}
})

    if (!user) {
        return next(new ErrorResponse("Неверный токен восстановления", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
        success: true,
        data: "Пароль восстановлен успешно"
    })

    } catch (error) {
        next(error);
    }
}

exports.updateSkippers = async(req,res,next) => {
    console.log('update skippers has been called', req);
    const email = req.body.params.email;
    const skippers = req.body.params.skippers

    try {
        const user = await User.findOne({email: email})
    
        if (!user) {
            return next(new ErrorResponse("не найден пользователь "), 404);
        }
        
        user.skippers = skippers;
    
        await user.save();
    
        res.status(201).json({
            success: true,
            data: 'Скиперы обновлены успешно'
        })
    } catch (error) {
        next(error);
    }
}

exports.updatecoins = async (req,res,next) => {
    console.log(req);
    const email = req.body.params.email;
    const coins = req.body.params.newCoins;

    console.log('updatecoins has been called');
    try {
    const user = await User.findOne({email: email})

    if (!user) {
        return next(new ErrorResponse("не найден пользователь "), 404);
    }
    
    user.coins = coins;

    await user.save();

    res.status(201).json({
        success: true,
        data: 'монеты обновлены успешно'
    })
} catch (error) {
    next(error);
}
}

exports.changeDoneTests = async (req,res,next) => {
    console.log(`CONTROLLER: `, req.body.params)
    console.log(`CONTROLLER: changing donetests on email ${req.body.params.email} to ${req.body.params.newDoneTests} `)

    const email = req.body.params.email
    const newDoneTests = req.body.params.newDoneTests;

    try {
        const user = await User.findOne({email: email});

        if (!user) {
            return next(new ErrorResponse('user not found '), 404);
        }
        console.log(`NEXT LINE IS DB SETTING TO ${newDoneTests}`);
        user.doneTests = newDoneTests;

        await user.save()

        res.status(201).json({
            success: true,
            data: 'donetests успешно обновлено'
        })

    } catch (error) {
        next(error);
    }

}



const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({success: true, token})
}
