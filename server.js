var express =  require("express");
var path =  require("path");
var fs =  require("fs")
var app =  express()
var MongoClient = require("mongodb").MongoClient


app.get('/' , (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/profile-picture' , (req, res)=>{
    var img  = fs.readFileSync("profile1.jfif")
    res.writeHead(200 , { "Content-type" :  "image/jfif"})
    res.end(img, "binary")
})


app.get('/profile' , async (req, res)=>{
    console.log("startng")
    try {
        const client = await MongoClient.connect('mongodb://admin:password@localhost:27017')
        var db = client.db('user-account')
        const query = { userId: 1 }
        const user  = await db.collection("users").findOne(query)

        
        client.close()
        res.send(user)
    }catch(err){
        console.log("error => ", err)
    }
    // MongoClient.connect('mongodb://admin:password@localhost:27017' , (err , client)=>{
    //     console.log("connected")
    //     if(err) throw err;
    //     var db = client.db('user-account')
    //     console.log("db = ", db)
    // })
})


app.listen(  3000 , ()=>{
    console.log("app is listening on this port ==> 3000")
})
