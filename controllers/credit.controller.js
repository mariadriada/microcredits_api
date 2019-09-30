let DB = require("../config/database")
let Credit = require("../models/credit.model")

// Get all credits from mongo db
const getAllCredits = async(req, res) => {
    // Open DB
    DB.connect()
   
    await Credit.find().populate('usuario').exec()
    .then((response)=>{
        res.status(200).send({"results": response})
    })
    .catch((res)=>{
        res.send({"error": error})
    })

    // Close DB
    DB.disconnect()
}


// Create middleware
const find = (req, res, next) => {
    // Open DB
    DB.connect()

    //Search_id credit
    Credit.findById(req.body._id)
    .then((response) => {
        // If response is not nul, the credit already exists
        if(response !== null) {
            return res.status(500).send({"error": "Credit alredy exists"})
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

// Create an credit
const createCredit = async (req, res) => {
    // Create user when not exists
    let newCredit = new Credit(req.body)
    
    await newCredit.save()
    .then((response) => {
        // send response in JSON format
        res.status(201).send({"mensaje": "Credito creado correctamente", "status": 201})
    })
    .catch((error) => {
        // send response in JSON format
        res.status(404).send({"error": error.message, "status":404})
    })

    DB.disconnect()
}



// Delete an credit
const deleteCredit = async (req, res) => {
    //Open DB
    DB.connect()

    await Credit.findById(req.params._id)
    .then(async (creditFound) => {
        // Delete user
        await creditFound.remove()
        .then((creditDeleted)=>{
            // The user has beed delete
            res.status(200).send({"message":"Credit deleted", "user":creditDeleted})
        })
        .catch((error)=>{
            res.send({"error": error.message})
        })
    })
    .catch((error)=>{
        res.send({"error":"Credit not exists"})
    })

    // close DB
    DB.disconnect()

}

// Update an credit
const updateCredit = async (req, res) => {
    //Open DB
    DB.connect()

    await Credit.findById(req.params._id)
    .then(async (creditFound)=>{
        // Way 1
        //User.update(userFound, req.body)
        // Way 2
        //userFound.update(req.body)
        //WAY 3
        let creditToSave = Object.assign(creditFound, req.body)
        await creditToSave.save()

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
    getAllCredits,
    find,
    createCredit,
    updateCredit,
    deleteCredit
}