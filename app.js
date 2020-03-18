var express = require("express"),
    app     = express(),
    port    = process.env.port || 3000,
    ip      = process.env.IP;

// Warming up
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
    res.render("index");
})

// Listen
app.listen(port,ip,function(){
    console.log ("listening through port: "+port);
})