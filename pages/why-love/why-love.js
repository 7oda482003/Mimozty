const reasons = [

{
    icon:`<i class="fa-solid fa-mosque"></i>`,
    title:"دينها",
    text:"أحب فيها قربها من الله، وحفظها لكتابه، وحرصها على رضاه.",
    opened:false,
    locked:false
},

{
    icon:"🤍",
    title:"حياؤها",
    text:"حياؤها يجعلها أجمل في عيني كل يوم.",
    opened:false,
    locked:false
},

{
    icon:"😊",
    title:"ابتسامتها",
    text:"ابتسامتها تغيّر يومي كله.",
    opened:false,
    locked:false
},

{
    icon:"🌹",
    title:"قلبها",
    text:"قلبها مليء بالرحمة والصدق.",
    opened:false,
    locked:false
},

{
    icon:"📖",
    title:"عقلها",
    text:"حديثها دائمًا له معنى.",
    opened:false,
    locked:false
},

{
    icon:"📖",
    title:"عقلها",
    text:"حديثها دائمًا له معنى.",
    opened:false,
    locked:false
},

{
    icon:"📖",
    title:"عقلها",
    text:"حديثها دائمًا له معنى.",
    opened:false,
    locked:false
},

{
    icon:"🌙",
    title:"صوتها",
    text:"في صوتها راحة لا أجدها في أي مكان.",
    opened:false,
    locked:false
},

{
    icon:"🌸",
    title:"دعاؤها",
    text:"يكفيني أنها تذكرني في دعائها.",
    opened:false,
    locked:false
},

{
    icon:"💍",
    title:"لأنها هي",
    text:"ولو خُيرت بين الجميع لاخترتها هي.",
    opened:false,
    locked:false
},

{
    icon:"🔒",
    title:"سر أخير",
    text:"لو سألوني... لماذا أحب مريم؟ لقلت... لأنها ليست مجرد شخصٍ أحببته... بل نعمةٌ دعوت الله طويلًا أن يرزقني بها. ولأن قلبي حين اختاركِ... شعر أنه وصل إلى وطنه. 🤍",
    opened:false,
    locked:true
}

];

const container=document.querySelector(".cards-container");

reasons.forEach(reason=>{

container.innerHTML+=`

<div class="love-card">

    <div class="card-inner">

        <!-- الوجه الأمامي -->
        <div class="card-front">

            <div class="card-icon">
                ${reason.icon}
            </div>

            <h2>${reason.title}</h2>

            <p>
            ${reason.locked ? "افتحي باقي الأسباب أولًا 🤍" : "اضغط لاكتشاف السبب"}
            </p>

        </div>

        <!-- الوجه الخلفي -->
        <div class="card-back">

            <h3>${reason.title}</h3><br>

            <p>${reason.text}</p>

        </div>

    </div>

</div>

`;

});

const cards = document.querySelectorAll(".love-card");

let openedCount = 0;

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
progressText.textContent = `0 / ${reasons.length}`;


cards.forEach((card,index)=>{

    card.addEventListener("click",(e)=>{

                // لو البطاقة مقفولة
        if(reasons[index].locked){

            if(openedCount < reasons.length - 1){

                card.classList.add("shake");

                setTimeout(()=>{
                    card.classList.remove("shake");
                },500);

                showToast("افتحي باقي الأسباب أولًا 🤍");

                return;
            }

        }

        // لو البطاقة اتفتحت قبل كده متعملش أي حاجة
        if (reasons[index].opened) return;

        // افتح البطاقة
        card.classList.add("flip");
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        createRipple(card,x,y);
        createHearts(card,x,y);

        card.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.04)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 300,
                easing: "ease-out"
            }
        );

        // سجل إنها اتفتحت
        reasons[index].opened = true;

        // زود العداد
        openedCount++;
        updateProgress();

        if(openedCount === reasons.length){

            setTimeout(()=>{

                openFinalMessage();

            },800);

        }

        // تأثير القلوب
        createHearts(card);

        // اهتزاز خفيف
        if (navigator.vibrate) {
            navigator.vibrate(25);
        }

    });

});


function updateProgress(){

    progressText.textContent = `${openedCount} / ${reasons.length}`;

    const percent = (openedCount / reasons.length) * 100;

    progressFill.style.width = percent + "%";

}

window.addEventListener("load",()=>{

    // إظهار الصفحة
    document.body.classList.add("loaded");

    // إظهار العنوان
    setTimeout(()=>{
        document.querySelector(".hero").classList.add("show");
    },300);

    // إظهار شريط التقدم
    setTimeout(()=>{
        document.querySelector(".progress-container").classList.add("show");
    },700);

});



const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry,index)=>{

        if(entry.isIntersecting){

            setTimeout(()=>{

                entry.target.classList.add("show");

            },index*150);

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.25,
    rootMargin:"0px 0px -80px 0px"
});

document.querySelectorAll(".love-card").forEach(card=>{

    observer.observe(card);

});

function createHearts(card,x,y){

    const hearts = ["🤍","❤️","💕"];

    for(let i=0;i<8;i++){

        const heart=document.createElement("span");

        heart.className="flying-heart";

        heart.textContent=hearts[Math.floor(Math.random()*hearts.length)];

        const rect = card.getBoundingClientRect();

        heart.style.left = (rect.left + window.scrollX + x) + "px";
        heart.style.top = (rect.top + window.scrollY + y) + "px";

        heart.style.setProperty("--x",(Math.random()*140-70)+"px");
        heart.style.setProperty("--rotate",(Math.random()*120-60)+"deg");

        document.querySelector(".page").appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },1400);

    }

}

function showToast(text){

const toast=document.getElementById("toast");

toast.textContent=text;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2000);

}

function createRipple(card,x,y){

    const ripple=document.createElement("span");

    ripple.className="ripple";

    ripple.style.left=x+"px";
    ripple.style.top=y+"px";

    card.appendChild(ripple);

    setTimeout(()=>{

        ripple.remove();

    },600);

}


const finalText = `

لو سألوني...

لماذا أحب مريم؟

لقلت...

لأنها ليست مجرد شخصٍ أحببته...

بل نعمةٌ دعوت الله طويلًا أن يرزقني بها.

ولأن قلبي حين اختاركِ...

شعر أنه وصل إلى وطنه. 🤍

`;

function openFinalMessage(){

    document.getElementById("finalMessage").classList.add("show");

    const element=document.getElementById("typewriter");

    element.textContent="";

    let i=0;

    const timer=setInterval(()=>{

        element.textContent+=finalText.charAt(i);

        i++;

        if(i>=finalText.length){

            clearInterval(timer);

        }

    },35);

}

document.getElementById("closeFinal").addEventListener("click",()=>{

    document.getElementById("finalMessage").classList.remove("show");

});