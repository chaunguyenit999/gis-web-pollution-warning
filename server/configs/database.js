const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        mongoose.set('strictQuery', false)
        const con = await mongoose.connect("mongodb+srv://long:1234@cluster0.angauf4.mongodb.net/project?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB