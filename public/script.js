let
    // DOMS
    stem            = document.querySelector("#stem"),
    answers         = document.querySelector("#answers"),
    explanationDiv  = document.querySelector("#explanation"),
    anotherOne      = document.querySelector("#another-one"),
    qCount          = document.querySelector("#question-count"),
    resultInput     = document.querySelector("#result-input"),
    reveal          = document.querySelector("#reveal"),
    message         = document.querySelector("#message"),
    percentDiv      = document.querySelector("#percentage"),
    userInput       = document.querySelector("#user"),
    // Other Vars
    currentQuestion = 0,
    score           = 0,
    explanation     = "",
    percentage      = 0;

var qbank =
    [
        { // Question 1
            stem    : "سبب تسمية فايروس كورونا بهذا الاسم هي",
            answers : [
                {text:"شكل الفايروس التاجي، مشتق من اللاتينية لكلمة تاج",   correct:true},
                {text:"اكتشاف الفايروس في مصنع مشروب كورونا الكحولي",      correct: false},
                {text:"اكتشاف الفايروس في مدينة كورونا، كاليفورنيا",       correct: false}
            ],
            explanation: `سبب تسمية الفايروس بهذا الاسم هو شكله التاجي كما في الصورة أدناه
                        <img src="/media/coronavirus_Crown.jpg" />
                        الصورة عبارة عن رسم توضيحي وليست حقيقية
                        <h3>المصادر</h3>
                        <a href="https://news.un.org/en/story/2020/02/1056562">أخبار الأمم المتحدة</a><br>
                        <a href="https://www.cdc.gov/coronavirus/types.html">مركز ممانعة الأمراض CDC</a>`
        },
        { //Question2
            stem    : "السؤال الثاني",
            answers : [
                {text:"خيار خطأ",   correct:false},
                {text:"خيار صحيح",                                            correct: true},
                {text:"كمان خطأ",       correct: false}
            ],
        } ,
        { //Question3
            stem    : "السؤال الثالث",
            answers : [
                {text:"خيار خطأ",   correct:false},
                {text:"خيار صحيح",                                            correct: true},
                {text:"كمان خطأ",       correct: false}
            ],
        } 
]


function generateQuestion(){
    answers.innerHTML = "";
    stem.innerHTML = "";
    explanationDiv.innerHTML="";
    if(currentQuestion < qbank.length){
        qCount.innerHTML = `${currentQuestion+1} \\ ${qbank.length}`;
        stem.innerHTML = qbank[currentQuestion].stem;
        qbank[currentQuestion].answers.forEach((answer)=>{
            answers.innerHTML += `<li onclick="submitAnswer(this,${answer.correct})">${answer.text}</li>`
        })
        explanation = qbank[currentQuestion].explanation;
    }else{
        reveal.style.display = "block";
        // percentDiv.innerHTML =  percentage+"%";
        // switch(true){
        // case percentage>80 : message.innerHTML = `أبدعت!<br> معلوماتك عن فيروس الكورونا ممتازة. تأكد من مشاركتها مع أصدقائك!`; break;
        // case percentage>60 : message.innerHTML = `معلوماتك عن فايروس الكورونا متوسطة، لربما ترغب بـ<a href="/">ـالمحاولة مرة أخرى</a>.`; break;  
        // }
        // message.innerHTML += `<br><br><iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fcoronaquiz.herokuapp.com%2F&layout=box_count&size=large&appId=193116785468625&width=77&height=58" width="77" height="58" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>`
    }
    anotherOne.disabled = true;
    anotherOne.style.display="none";
}

function submitAnswer(that, correct, explained){
    
    if(correct){
        score++
    }
    qCount.style.marginBottom = "0";
    anotherOne.style.display = "block";
    anotherOne.disabled = false;
    answers.childNodes.forEach((answer,i)=>{
        answer.onclick = "";
        
        if(qbank[currentQuestion].answers[i].correct){
            answer.classList.add("correct")
        }else{
            answer.classList.add("incorrect")

        }
    })
    explanationDiv.innerHTML = explanation;
    percentage = Math.floor(score/qbank.length*100);
    resultInput.value = percentage;
}

// Aaaaaaaand ACTION!
generateQuestion()
anotherOne.addEventListener("click",()=>{
    currentQuestion ++;
    generateQuestion();
});

