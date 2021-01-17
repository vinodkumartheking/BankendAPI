const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors');
dotenv.config()

mongoose.connect(process.env.MongoDBfullurl)
var app = express()

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.send("Backend is running")
})

var MongoClient = require("mongodb").MongoClient;
let url = process.env.MongoDBcollectionURL //"mongodb+srv://dbadminusr:dbadmin@cluster0.h8q7y.mongodb.net/"

app.get("/getdoctor",(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        
        let dbo = db.db("DoctorDB")
        let query = {location:"Madurai"}
        dbo.collection("DoctorCollection").find().toArray((err,result)=>{
            if(err) throw err;
            console.log(result)
            res.send(result)
            db.close()
        })
    })
})

app.get("/getdoctor/id",(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        
        let dbo = db.db("DoctorDB")
        let query = {Id:ObjectId(`${id}`)}
        dbo.collection("DoctorCollection").find(query).toArray((err,result)=>{
            if(err) throw err;
            console.log(result)
            res.send(result)
            db.close()
        })
    })
})

app.post('/bookappointment',(req,res)=>{
    req.headers("Auth","slkdjf342knd")
    //code to save in mongobd
    res.send()
    db.close()
})

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("applicaiton is running fine")
})