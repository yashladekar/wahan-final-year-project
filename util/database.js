const mongodDB = require('mongodb')
const MongoClient = mongodDB.MongoClient

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect("mongodb+srv://yashladekar:oZrtpcup413Ul2yd@cluster0.2lpkxw3.mongodb.net/?retryWrites=true&w=majority")
        .then((client) => {
            console.log('connected');
            _db = client.db()
            callback(client)
        })
        .catch((err) => {
            console.log(err);
        })
}


const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'no database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb