import {
  db,
  collection,
  addDoc,
  getDocs
} from "./firebase.js";




// العمر 
function calculateAge() {

    const birthDate = new Date(2007, 1, 18, 12, 0, 0); // عدّل هنا تاريخ ووقت الميلاد

    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    let hours = now.getHours() - birthDate.getHours();
    let minutes = now.getMinutes() - birthDate.getMinutes();
    let seconds = now.getSeconds() - birthDate.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    if (hours < 0) {
        hours += 24;
        days--;
    }

    if (days < 0) {
        months--;

        const lastMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
        );

        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

// تشغيل أول مرة
calculateAge();

// تحديث كل ثانية بدون ما تعمل refresh
setInterval(calculateAge, 1000);

///////////////////////////////




// القلوب حوالين الرأس
const orbit = document.querySelector(".orbit3d");

const emojy = ["🦋","✨","🤍","🌟"];

for(let i=0;i<8;i++){

    const el = document.createElement("div");

    el.className = "fly";
    el.innerHTML = emojy[i % emojy.length];

    orbit.appendChild(el);

    animate(el, i * (Math.PI * 2 / 8));
}

function animate(el,startAngle){

    let angle = startAngle;

    function frame(){

        angle += 0.02;

        const rx = 50;  // العرض
        const ry = 35;  // الارتفاع

        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * ry;

        const depth = (-Math.sin(angle) + 1) / 2;

        const scale = 0.6 + depth * 0.8;

        el.style.left = `${x}px`;
        el.style.top  = `${y}px`;

        el.style.transform =
            `translate(-50%,-50%) scale(${scale})`;

        el.style.opacity =
            0.3 + depth * 0.7;

        el.style.zIndex =
            Math.floor(depth * 100);

        requestAnimationFrame(frame);
    }

    frame();
}

//////////////////////////////





// القلوب اللي هتطير عند الرسالة
const container = document.getElementById("heartContainer");

const emojis = [
    "❤️",
    "🤍",
    "💕",
    "💖",
    "💗",
    "💘",
    "🦋",
    "✨",
    "🌸",
    "🥰"
];

function createEmoji() {
    const emoji = document.createElement("div");

    emoji.classList.add("heart");
    emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

    emoji.style.left = Math.random() * 100 + "%";
    emoji.style.fontSize = (Math.random() * 15 + 20) + "px";

    container.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, 6000);
}

setInterval(createEmoji, 400);

////////////////////////////////////




// تحكمات الفيديوهات
const videos = document.querySelectorAll("video");

videos.forEach(video => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        video.pause();
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(video);
});




// تسجيل الدخول
function checkLogin(){

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();

    if(username === "ميموزتي" && password === "1822007"){

        const time = new Date().toLocaleString("ar-EG");

        fetch(
            "https://api.telegram.org/bot8725319187:AAEuZBO-bY_B1E8prcAKLEoRn0-chnXlYio/sendMessage?chat_id=1916841565&text=" +
            encodeURIComponent(
                `تم تسجيل دخول جديد للموقع ✅\nالوقت: ${time}`
            )
        );

        document.getElementById("login-screen").style.display = "none";
        document.getElementById("website-content").style.display = "block";

    }else{

        document.getElementById("error-msg").innerText =
        "اسم المستخدم أو كلمة المرور غير صحيحة";
    }
}

// الرسالة السرية

const secretBtn = document.getElementById("secretBtn");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

secretBtn.addEventListener("click", () => {
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
    overlay.classList.remove("show");
    document.body.style.overflow = "auto";
});

/* قفل عند الضغط خارج المربع */
overlay.addEventListener("click", (e) => {
    if(e.target === overlay){
        overlay.classList.remove("show");
        document.body.style.overflow = "auto";
    }
});

console.log("story loaded")



// هنجرب
const storyBtns = document.querySelectorAll(".story-btn");
const closeBtns = document.querySelectorAll(".close-story");

storyBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        const popupId = btn.dataset.popup;

        document.getElementById(popupId).style.display = "flex";

        document.body.style.overflow = "hidden";
    });

});

closeBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        btn.closest(".story-overlay").style.display = "none";

        document.body.style.overflow = "auto";
    });

});

// إضافة الذكري
const saveMemoryBtn =
document.getElementById("saveMemoryBtn");

if(saveMemoryBtn){

saveMemoryBtn.addEventListener("click", () => {

    const memoryName =
    document.getElementById("memoryName").value;

    const title =
    document.getElementById("memoryTitle").value;

    const text =
    document.getElementById("memoryText").value;

    const image =
    document.getElementById("memoryImage").files[0];

    if(!memoryName || !title || !text || !image){

        alert("اكمل البيانات");

        return;
    }

    const reader = new FileReader();

    reader.onload = async function(e){

        try{

            await addDoc(
                collection(db, "memories"),
                {
                    memoryName,
                    title,
                    text,
                    image: e.target.result,
                    createdAt: Date.now()
                }
            );

            alert("تم حفظ الذكرى ❤️");

            location.reload();

        }catch(error){

            console.error(error);

            alert("حدث خطأ أثناء الحفظ");

        }

    }

    reader.readAsDataURL(image);

});

}



async function loadMemories(){

    const snapshot =
    await getDocs(collection(db,"memories"));

    snapshot.forEach((doc)=>{

        const memory = doc.data();

        const popupId = "popup_" + doc.id;

        const button = document.createElement("button");

        button.className = "story-btn";

        button.textContent = memory.memoryName;

        button.dataset.popup = popupId;

        document
        .getElementById("storyGrid")
        .appendChild(button);

        const popup =
        document.createElement("div");

        popup.className = "story-overlay";

        popup.id = popupId;

        popup.innerHTML = `
        <div class="story-modal">

            <button class="close-story">✖</button>

            <div class="story-content">

                <h2>${memory.title}</h2>

                <p>${memory.text}</p>

                <img src="${memory.image}">

            </div>

        </div>
        `;

        document.body.appendChild(popup);

        button.addEventListener("click",()=>{

            popup.style.display="flex";

            document.body.style.overflow="hidden";

        });

        popup.querySelector(".close-story")
        .addEventListener("click",()=>{

            popup.style.display="none";

            document.body.style.overflow="auto";

        });

    });

}

loadMemories();