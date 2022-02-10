//require('dotenv').config({path: '../config.env'})
const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://coverkincel:200311800g@cluster0.7rzke.mongodb.net/mytable?retryWrites=true&w=majority")
    
    console.log("MongoDB connected")
}

module.exports = connectDB;