const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://long:1234@cluster0.angauf4.mongodb.net/project', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect succesfully')
    } catch (error) {
        console.log('connect fail')
    }
}

module.exports = { connect };