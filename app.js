if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    port        = process.env.PORT || 3000,
    ip          = process.env.IP;

    
    var questionSchema = new mongoose.Schema({
        stem        : String,
        answers     : [{
            text: String,
            correct: Boolean,
            selected: {type: Number, default: 0}
            }],
        explanation : String
    })
    var Question = mongoose.model("Question", questionSchema);
    
    // Warming up
    app.set("view engine","ejs");
    app.use(express.static(__dirname+"/public"));
    app.use(bodyParser.urlencoded({extended: true}));
    
    var urlDatabase = process.env.DATABASE_URL || "mongodb://localhost:27017/corona_quiz";
    mongoose.connect( urlDatabase ,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
    .then(()=>{console.log("connected to: "+ urlDatabase)})
    .catch(err =>{console.log(err.message);});
    
app.get("/generate",(req,res)=>{
    async function generateQuiz(){
        try{
        var quiz = [];
            await Question.aggregate([{ $sample: { size: 10 } }],(err,questions)=>{
                questions.forEach(question=>{
                    quiz.push(question._id)
                    console.log(quiz);
                })    
            res.send(quiz)
        })}catch(err){
            console.log(err)
        }
    } 
    generateQuiz();
})

app.get("/questions/:id",(req,res)=>{
    var id = req.params.id;
    Question.findById(id,(err,question)=>{
        console.log(question)
        var answerTexts = []
        question.answers.forEach((answer)=>{
            answerTexts.push(answer.text)
        })
        res.send({stem: question.stem, answers: answerTexts})
    })
})

app.get("/questions/:id/:answer",(req,res)=>{
    var id      = req.params.id;
    var answer  = req.params.answer;
    Question.findById(id,(err,question)=>{
        console.log(question.answers[answer])
        var correct = false;
        if(question.answers[answer].correct){correct= true}
        res.send({explanation: question.explanation,
                    answers: question.answers,
                correct:correct})
    })
})

app.get("/",(req,res)=>{
    res.render("index");
})
    
app.post("/",(req,res)=>{
    var result = req.body.result,
        // newCommer =req.body.newCommer,
        // user   = req.body.user,
        // quiz = {result:result, user:user}
        rating = ""
        switch(true){
            case result>=80 : rating = `jbeliy3hweo`; break;
            case result>=60 : rating = `njiuh65laeemn`; break;  
            case result>=40 : rating = `knlihuu55h`; break;  
            case result<=40 : rating = `i98ouasd`; break;
            }
        res.redirect("/"+rating+"?score="+result)
})

app.get("/:rating",(req,res)=>{
    var rating = req.params.rating;
    var score  = req.query.score;
    var message = ""
    var ogImg = ""
    switch(rating){
        case `jbeliy3hweo`   : ogImg = "excellent"; message = `أبدعت!<br> معلوماتك عن فيروس الكورونا ممتازة. تأكد من مشاركتها مع أصدقائك!<br><a href="/">أجر الاختبار مرة أخرى</a>`; break;
        case `njiuh65laeemn` : ogImg = "average"; message = `معلوماتك عن فايروس الكورونا متوسطة، لربما ترغب بـ<a href="/">ـالمحاولة مرة أخرى</a>.`; break;  
        case `knlihuu55h`    : ogImg = "limited"; message = `معلوماتك عن فايروس الكورونا محدودة، لربما ترغب بـ<a href="/">ـالمحاولة مرة أخرى</a>.`; break;
        case `i98ouasd`      : ogImg = "weak"; message = `معلوماتك عن فايروس الكورونا ضعيفة جدا، ننصحك بالاطلاع على المزيد من المصادر. لربما ترغب بـ<a href="/">ـالمحاولة مرة أخرى</a>.`; break;
    }
    if(!score){
        res.redirect("/")
}else{
    res.render("result",{score:score, message:message, rating:rating, ogImg:ogImg, referer:process.env.REFERER});
}
    })


// Listen
app.listen(port,ip,function(){
    console.log ("listening through port: "+port);
})