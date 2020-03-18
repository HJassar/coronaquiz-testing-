if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    port        = process.env.PORT || 3000,
    ip          = process.env.IP;

    
    var quizSchema = new mongoose.Schema({
        user    : String,
        result  : Number
    })
    var Quiz = mongoose.model("Quiz", quizSchema);
    
    // Warming up
    app.set("view engine","ejs");
    app.use(express.static(__dirname+"/public"));
    app.use(bodyParser.urlencoded({extended: true}));
    
    var urlDatabase = process.env.DATABASE_URL || "mongodb://localhost:27017/corona_quiz";
    mongoose.connect( urlDatabase ,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
    .then(()=>{console.log("connected to: "+ urlDatabase)})
    .catch(err =>{console.log(err.message);});
    
    //// Temporary
    Quiz.deleteMany({},(err,deleted)=>{
        console.log("clear the path");
    })


    app.get("/",(req,res)=>{
        res.render("index");
    })
    
app.post("/",(req,res)=>{
    var result = req.body.result,
        user   = req.body.user,
        quiz = {result:result, user:user}
    Quiz.create(quiz,(err,newQuiz)=>{
        console.log(newQuiz)
        res.redirect("/"+newQuiz._id)
    })
})

app.get("/:id",(req,res)=>{
    var id = req.params.id;
    var message = ""
    Quiz.findById(id,(err,foundQuiz)=>{
        switch(true){
            case foundQuiz.result>80 : message = `أبدعت!<br> معلوماتك عن فيروس الكورونا ممتازة. تأكد من مشاركتها مع أصدقائك!`; break;
            case foundQuiz.result>60 : message = `معلوماتك عن فايروس الكورونا متوسطة، لربما ترغب بـ<a href="/">ـالمحاولة مرة أخرى</a>.`; break;  
            }
        res.render("result",{quiz:foundQuiz, message:message});
    })
})

// Listen
app.listen(port,ip,function(){
    console.log ("listening through port: "+port);
})