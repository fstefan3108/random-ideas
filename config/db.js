const mongoose = require("mongoose");

const connectDatabase = async () => {
 
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo db connected " + con.connection.host);

}

mongoose.set("strictQuery", true);

module.exports = connectDatabase;