//const STRING_CONNECTION = "mongodb://app:1234@localhost:27017/microcredits_db"
//const STRING_CONNECTION = "mongodb://admin:Admin123@ds137508.mlab.com:37508/microcredits_db"
const STRING_CONNECTION  = "mongodb+srv://admin:Admin123@cluster0-2zum3.mongodb.net/microcredits_bd"

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_CONNECTION: STRING_CONNECTION
} 