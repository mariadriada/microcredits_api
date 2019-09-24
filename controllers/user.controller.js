let mongoose = require("mongoose")
let User = require("../models/user.model")

let connectionString = "mongodb://app:1234@localhost:27017/microcredits_db"
mongoose.connect(connectionString)

// Get all users
const getAllUsers = (req, res) => {
    // Call to bd
    res.send("Get all users")
}

// Create an user
const createUser = (req, res) => {

    //Buscar si la cedula del usuario ya existe 
    User.findOne({cedula: req.body.cedula})
    .then((response) => {
        console.log("user ", response)
        // No se puede crear

        
    })
    .catch((error) => {
        console.log("error ", error)
        // Se puede crear en la bd

        let newUser = new User(req.body)
        newUser.save()
        .then((response) => {
            console.log("response", response)
                // send response in JSON format
            res.status(201).send({"mensaje": "Usuario creado correctamente", "status": 201})
        })
        .catch((error) => {
            console.log("*********************error", error.message)
            // send response in JSON format
            res.status(404).send({"error": error.message, "status":404})
        })

    })

/*
    
    */


}

// Delete an user
const deleteUser = (req, res) => {
    // Call to bd
    res.send("Delete user")
}

// Update an user
const updateUser = (req, res) => {
    // Call to bd
    res.send("Update user")
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
}