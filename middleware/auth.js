//check for jwt in headers

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req,res,next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token) { 
        return next(new ErrorResponse("Нет доступа к этому route", 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse("Не найдено пользователя с таким id", 404));
        }

        req.user = user;

        next(); // next piece of controller in the route
    } catch (error) {
        return next(new ErrorResponse("Вы не авторизованы к этому route", 401))
    }
}