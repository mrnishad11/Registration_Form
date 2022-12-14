var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
 const app =express()

 app.use(bodyParser.json())
 app.use(express.static('public'))
 app.use(bodyParser.urlencoded({
    extended:true
 }))
 mongoose.set('strictQuery', true);
 mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology: true
 });
 var db=mongoose.connection;
db.on('error',()=>console.log("Error in connectong database"));
db.on('open',()=>console.log("connected to database"));

 app.post("/sign_up",(req,res)=>{
    var name= req.body.name;
    var age=req.body.age;
    var batch= req.body.batch;

    var data={
        "name":name,
        "age":age,
        "batch":batch
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if (err){
            throw err;
        }
        console.log("Record inserted");
    });
    return res.redirect('signup_success.html')
 })
 app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin:": '*'
    })
    return res.redirect('index.html');
 }).listen(3000);
 console.log("listening on port 3000");