const connectDB = function() {
    const MongoClient = require("mongodb").MongoClient;
    const user = process.env.DBNAME || "Daniil";
    const pwd = process.env.DBPASS || "Gendee2004";
    const uri = `mongodb+srv://${user}:${pwd}@cluster0.sxs58.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    return new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = connectDB;