const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/wpr-quiz', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!!!')
    } catch (error) {
        console.log('Fail to connect');
    }
}

module.exports = { connect }