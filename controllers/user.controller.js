const mongoose = require("mongoose")
const User = require("../models/user.model")
const DB = require("../config/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Get all users
const getAllUsers = async (req, res) => {
    // Open DB
    DB.connect()
   
    await User.find()
    .then((response)=>{
        res.status(200).send({"results": response})
    })
    .catch((res)=>{
        res.send({"error": error})
    })

    // Close DB
    DB.disconnect()
}

// Login
const login = async (req, res) => {

    DB.connect()

    // Validate user
    await User.findOne({"email": req.body.email})
    .then( async (response)=>{
        // Compare clave with hash
        await bcrypt.compare(req.body.clave.trim(), response.clave)
        .then((status)=>{
            // if status is true, generate token

            if(status){    
                jwt.sign({"email":req.body.email}, response.clave, 
                (error, token) =>{
                    console.log("SESSION****************", req.session)
                    // Send a cookie
                    res.cookie("token", token)
                    res.status(200).send({"token": token})
                })
            }
        })
        .catch((error)=>{
            console.log("Incorrect user", error)
        })
    })
    .catch((error)=>{
        console.log("Error", error)
    })

    DB.disconnect()
}

// Create middleware
const find = (req, res, next) => {
    // Open DB
    DB.connect()

    //Buscar si la cedula del usuario ya existe 
    User.findOne({cedula: req.body.cedula})
    .then((response) => {
        console.log("user ", response)
        // If response is not nul, the user already exists
        if(response !== null) {
            return res.status(500).send({"error": "User alredy exists"})
        }
        // Can be user
        else {
            next()
        }
    })
    .catch((error) => {
        res.send({"error":error.message})
        // Close DB
        DB.disconnect()
    })
}

// generate hash to user key
const generateHash = async (req, res, next) => {
    await bcrypt.hash(req.body.clave, 10).then((hash)=>{
        req.body.clave = hash
        next()
    })
}

// Create an user
const createUser = async (req, res) => {
    // Create user when not exists
    let newUser = new User(req.body)
    await newUser.save()
    .then((response) => {
        // send response in JSON format
        res.status(201).send({"mensaje": "Usuario creado correctamente", "status": 201})
    })
    .catch((error) => {
        // send response in JSON format
        res.status(404).send({"error": error.message, "status":404})
    })

    DB.disconnect()
}

// Delete an user
const deleteUser = async (req, res) => {
    //Open DB
    DB.connect()

    await User.findById(req.params._id)
    .then(async (userFound) => {
        // Delete user
        await userFound.remove()
        .then((userDeleted)=>{
            // The user has beed delete
            res.status(200).send({"message":"User deleted", "user":userDeleted})
        })
        .catch((error)=>{
            res.send({"error": error.message})
        })
    })
    .catch((error)=>{
        res.send({"error":"User not exists"})
    })

    // close DB
    DB.disconnect()

}

// Update an user
const updateUser = async (req, res) => {
    //Open DB
    DB.connect()

    await User.findById(req.params._id)
    .then(async (userFound)=>{
        // Way 1
        //User.update(userFound, req.body)
        // Way 2
        //userFound.update(req.body)
        //WAY 3
        let userToSave = Object.assign(userFound, req.body)
        await userToSave.save()

        .then(()=>{
            res.send("Udated")
        })
        .catch(()=>{
            res.send("No")
        })
    })
    .catch(()=>{
        res.send("error")
    })
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    find,
    login,
    generateHash
}