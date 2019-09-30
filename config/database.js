let mongoose = require("mongoose")
const { DB_CONNECTION } = require("../config/config")

module.exports = {
    // varriable to indicate the connection status
    connection: false,

    // Function to do connect
    connect: () => {
        //If connection is active, return the connection
        if(this.connection) return this.connection

        // Connect to bd
        mongoose.connect(DB_CONNECTION)
        .then((connection)=>{
            console.log("CONECTION", connection)
        })
        .catch((error)=>{
            console.log("ERROR:", error)
        })
    },

    // Disconnect database connection 
    disconnect: () => {
        mongoose.connection.close()
        .then(()=>{
            console.log("DISCONNECTED!")
        })
        .catch(()=>{
            console.log("DISCONNECTED FAIL!")
        })
    }

}
