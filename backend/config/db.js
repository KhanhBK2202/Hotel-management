const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database connected");
    } catch(error){
        console.log(error.message)
        process.exit(1)
    }
};

module.exports = connectDatabase;
