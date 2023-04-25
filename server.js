var express =  require("express");
var path =  require("path");
var fs =  require("fs")
var app =  express()


app.get('/' , (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/profile-picture' , (req, res)=>{
    var img  = fs.readFileSync("profile1.jfif")
    res.writeHead(200 , { "Content-type" :  "image/jfif"})
    res.end(img, "binary")
})


app.listen(  3000 , ()=>{
    console.log("app is listening on this port ==> 3000")
})
