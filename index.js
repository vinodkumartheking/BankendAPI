const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect("mongodb+srv://dbadminusr:dbadmin@cluster0.h8q7y.mongodb.net/DoctorDB?retryWrites=true&w=majority")
var app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.send("Backend is running")
})

var MongoClient = require("mongodb").MongoClient;
let url = "mongodb+srv://dbadminusr:dbadmin@cluster0.h8q7y.mongodb.net/"

app.get("/getdoctor",(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        let dbo = db.do("DoctorDB")
        let query = {location:"madurai"}
        dbo.collection("DoctorCollection").find(query).toArray((err,result)=>{
            if(err) throw err;
            console.log(result)
            res.send(result)
            db.close()
        })
    })
})

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("applicaiton is running fine")
})