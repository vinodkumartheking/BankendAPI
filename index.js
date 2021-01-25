const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId; 

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
const e = require("express");
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

app.get("/getdoctor/:id",(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        
        let dbo = db.db("DoctorDB")
        let query = {"_id" : ObjectId(req.params.id)}
        console.log("test"+req.params.id)
       // console.log(`${id}`)
        //'{"_id":ObjectId("5fc48ab9ae5c8c55034866b6")}' //{Id:"ObjectId("+`${id}`+")"}
        dbo.collection("DoctorCollection").find(query).toArray((err,result)=>{
            if(err) throw err;
            console.log(result)
            res.send(result)
            db.close()
        })
    })
})

app.post('/bookappointment',(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err){InsertErrorOccurred(err)}
        let dbo = db.db("BookingCollection")
       
        console.log("test"+req.body)
        
      
        dbo.collection("BookingCollection").insertOne(req.body, function(err, res) {
            if (err) { res.send("Error in booking")}
            console.log("1 document inserted");
            res.send("Booked successfully")
            db.close();
          });
    })
})

function InsertErrorOccurred(err){
    //insert in error table ErrorCollection
    MongoClient.connect(url,(err,db)=>{
        
        let dbo = db.db("ErrorCollection")
       let myobj=err.toString();
        console.log("test"+req.body)
        myobj = req.body.toString()
      
        dbo.collection("ErrorCollection").insertOne(myobj, function(err, res) {
            if (err) { throw err}
            console.log("1 document inserted");
            res.send("Error recored successfully")
            db.close();
          });
    })
}

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("applicaiton is running fine")
})

