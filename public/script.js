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
    getResult       = document.querySelector("#get-result"),
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
                        <br>
                        <img src="/media/coronavirus_Crown.jpg" width=500 />
                        <br>
                        الصورة عبارة عن رسم توضيحي وليست حقيقية
                        <br>
                        <h3>المصادر</h3>
                        <a href="https://news.un.org/en/story/2020/02/1056562">أخبار الأمم المتحدة</a><br>
                        <a href="https://www.cdc.gov/coronavirus/types.html">مركز ممانعة الأمراض CDC</a>`
        },
        { //Question2
            stem    : "ما هو اسم المرض المنتشر حاليا والذي يسببه فايروس كورونا؟",
            answers : [
                {text:"MERS",   correct:false},
                {text:"COVID-19",  correct: true},
                {text:"SARS",       correct: false}
            ],
            explanation: `رغم تسبب فايروس الكورونا بالحالات المذكورة جميعا، إلا أن المرض المنتشر
                            حاليا سببه سلالة جديدة من الفايروس تختلف عن السلالتين المسببتين لكل من
                            MERS
                            الذي بدأ ظهوره في السعودية في 2012
                            و
                            SARS
                            الذي بدأ ظهوره في الصين في 2003.`
        } ,
        { //Question3
            stem    : "ما هي الأعراض المصحوبة بالإصابة بمرض COVID-19 )",
            answers : [
                {text:`<img src="https://images.unsplash.com/photo-1580917922805-f8f57e08c0ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" height=100 ><br>السخونة`, correct: false},
                {text:`<img src="https://www.quickanddirtytips.com/sites/default/files/styles/article_main_image/public/images/2962/man-cough.jpg?itok=k2wtyMxW" height=100 ><br>السعال`, correct: false},
                {text:`<img src="https://doctordaliah.files.wordpress.com/2018/04/bigstock-man-exhales-with-hands-on-ches-41853091.jpg" height=100 ><br>ضيق النفس`, correct: false},
                {text: "جميع الأعراض المذكورة أعلاه", correct:true}
            ],
            explanation: `أعراض COVID-19
             في الغالب الأعم تظهر على الجهاز التنفسي. بالرغم من ذلك، فإن ظهور أعراض الجهاز الهضمي (كالإسهال والتقيؤ) واردة أيضا`
        },
        { //Question 4: incubation period
            stem: `كم تستغرق فترة الحضانة لـ COVID-19. 
            فترة الحضانة هي الفترة الواقعة بين الإصابة بالمرض وظهور الأعراض.`,
            answers : [
                {text:`يومين - 14 يوما`, correct: true},
                {text:`15-30 يوما`, correct: false},
                {text:`30-45 يوما`, correct: false},
                {text:`تظهر الأعراض خلال 24 ساعة من الإصابة، وقد تظهر مباشرة فور الإصابة`, correct: false},
            ],
            explanation: `قد تستغرق الأعراض 14 يوما حتى تظهر على المصاب بهذا المرض. هذا يعني أن المصاب يكون حاملا للمرض ويسبب العدوى للآخرين حتى لو لم تكن هذه الأعراض ظاهرة لديه! لذا يجب توخي الحيطة والحذر في التعامل حتى مع غير المصابين بالمرض.`
        } ,
        { //Question 5: prevention
            stem: `واحدة فقط من الإجراءات الآتية تقي من الإصابة بـ COVID-19`,
            answers : [
                {text:`عصير الليمون، بشرط أن يكون طبيعيا وغير مخفف`, correct: false},
                {text:`التبخر بمنقوع اليانسون لمدة نصف ساعة يوميا`, correct: false},
                {text:`تناول الفيتامينات يوميًا`, correct: false},
                {text:`إبقاء النوافذ مفتوحة في السيارة`, correct: false},
                {text:`التباعد في صفوف المساجد، بحيث يكون بين المصلين ما يعادل خمسة أشخاص`, correct: false},
                {text:`تعقيم اليدين باستخدام المحلول الكحولي الطبي`, correct: true},
            ],
            explanation: `من أهم طرق تجنب انتشار الفايروس والإصابة به
            <ul>
                <li>
                تجنب المصافحة باليد ولمس الوجه
                </li>
                <li>
                تعقيم اليدين قدر الإمكان، وذلك لقدرة الكحول على القضاء على الفايروس
                </li>
                <li>
                تجنب التجمع في الأماكن العامة، خاصة المغلقة منها. وجود شخص مصاب 
                (تذكر أن المصاب قد لا تظهر عليه الأعراض حتى 14 يوما من الإصابة)،
                وجود هذا الشخص في أي تجمع سواء أكان اجتماعيا أو دينيا، هو سبب مباشر لتعرض جميع المتواجدين للإصابة.
                </li>
            </ul>
            `
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
            answers.innerHTML += `<li class="choice" onclick="submitAnswer(this,${answer.correct})">${answer.text}</li>`
        })
        explanation = qbank[currentQuestion].explanation;
    }else{
        getResult.style.display = "block";
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
    explanationDiv.innerHTML = `<h2>
                                التفاصيل
                                </h2>
                                ${explanation}`;
    percentage = Math.floor(score/qbank.length*100);
    resultInput.value = percentage;
}

// Aaaaaaaand ACTION!
generateQuestion()
anotherOne.addEventListener("click",()=>{
    currentQuestion ++;
    generateQuestion();
});

