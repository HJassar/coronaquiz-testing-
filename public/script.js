let
    // DOMS
    stem            = document.querySelector("#stem"),
    answersDiv      = document.querySelector("#answers"),
    explanationDiv  = document.querySelector("#explanation"),
    anotherOne      = document.querySelector("#another-one"),
    qCount          = document.querySelector("#question-count"),
    resultInput     = document.querySelector("#result-input"),
    reveal          = document.querySelector("#reveal"),
    message         = document.querySelector("#message"),
    percentDiv      = document.querySelector("#percentage"),
    userInput       = document.querySelector("#user"),
    getResult       = document.querySelector("#get-result"),
    // Other Vars
    currentQuestion = 0,
    score           = 0,
    explanation     = "",
    percentage      = 0;

// let's formulate the qbank
// var qbank = ["5e768bc9a69eb843d42d4de4", "5e768bc9a69eb843d42d4de0", "5e768bc9a69eb843d42d4de9", "5e768bc9a69eb843d42d4ddc", "5e768bc9a69eb843d42d4dee"]

var qbank;

fetch("/generate",{
    method:'get'
})
    .then(function(response){
        return response.json();
    })
    .then(function(data){
       qbank = data;
       
    }).catch(function(){
        console.log("err");
})
    



function generateQuestion(){
    answersDiv.innerHTML = "";
    stem.innerHTML = "";
    explanationDiv.innerHTML="";
    var url = "/questions/"+qbank[currentQuestion];
    if(currentQuestion < qbank.length){
    fetch(url,{
        method:'get'
    })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            stem.innerHTML = data.stem;
            data.answers.forEach((answer,i)=>{
                answersDiv.innerHTML += `<li class="choice" onclick="submitAnswer(this,'/questions/${qbank[currentQuestion]}/${i}', ${i})">${answer}</li>`
            })
        }).catch(function(){
            console.log("err");
        })
        qCount.innerHTML = `${currentQuestion+1} \\ ${qbank.length}`;
        explanation = qbank[currentQuestion].explanation;
    }else{
        getResult.style.display = "block";
    }
    anotherOne.disabled = true;
    anotherOne.style.display="none";
    percentage = Math.floor(score/qbank.length*100);

    resultInput.value = percentage;
}

function submitAnswer(that, url, selectedOrder){
    
    fetch(url,{
        method:'get'
    })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            explanationDiv.innerHTML = `<h2>
                                التفاصيل
                                </h2>
                                ${data.explanation}`;
            if(data.answers[selectedOrder].correct){
                score ++
            }
        console.log(score)
        
        if(!data.correct){that.style = "background:red"}
        
        answersDiv.childNodes.forEach((answer,i)=>{
            answer.onclick = "";
            if(data.answers[i].correct){
                answer.classList.add("correct")
            }else{
                answer.classList.add("incorrect")
    
            }
        })
        }).catch(function(){
            console.log("err");
        })
    
    qCount.style.marginBottom = "0";
    anotherOne.style.display = "block";
    anotherOne.disabled = false;
    
    
}

// Aaaaaaaand ACTION!
setTimeout(()=>{
    generateQuestion()
    console.log(qbank)
},2000);

anotherOne.addEventListener("click",()=>{
    currentQuestion ++;
    generateQuestion();
});

