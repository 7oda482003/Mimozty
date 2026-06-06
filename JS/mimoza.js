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


const videos = document.querySelectorAll(".video-container");

videos.forEach(container => {
  const video = container.querySelector(".myVideo");
  const playBtn = container.querySelector(".playBtn");

  // وقف الفيديو عند الخروج من الشاشة
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        video.pause();
        playBtn.style.display = "block";
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(video);
});





function checkLogin(){

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();

    if(username === "ميموزتي" && password === "1822007"){

        document.getElementById("login-screen").style.display = "none";
        document.getElementById("website-content").style.display = "block";

    }else{

        document.getElementById("error-msg").innerText =
        "اسم المستخدم أو كلمة المرور غير صحيحة";
    }
}