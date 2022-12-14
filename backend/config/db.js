const mongoose = require("mongoose");

const connectDatabase = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.Username}:${process.env.Password}@hotelmanagement.qr3ia49.mongodb.net/?retryWrites=true&w=majority`, {
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
