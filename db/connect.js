const { MongoClient } = require('mongodb');
require('dotenv').config();

const getConnection = async () => {
    const connectionString = process.env.MONGO_URL;
    const dbName = process.env.MONGO_DB_NAME;
    const client = new MongoClient(connectionString);
    let connection;

    try {
        connection = await client.connect();
    } catch(e) {
        console.error(e);
    }

    let db = connection.db(dbName);
    return db;    
}

module.exports.db = getConnection();


