import {
  db,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from "./firebase.js";

let isAdmin = false;
const Bot_Token = "8725319187:AAFZFK8bsvzvAgDtwz_eojm_xWTDXjWjPwk";



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

    const time = new Date().toLocaleString("ar-EG")

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();
    if(username === "محمود" && password === "1912003"){

        isAdmin = true;

        document.getElementById("login-screen").style.display = "none";
        document.getElementById("website-content").style.display = "block";

        loadMemories();

        fetch(
            `https://api.telegram.org/bot${Bot_Token}/sendMessage?chat_id=1916841565&text=` +
            encodeURIComponent(
                `تم تسجيل دخول الأدمن للموقع ✅\nالوقت: ${time}`
            )
        );

    }
    else if(username === "ميموزتي" && password === "1822007"){

        isAdmin = false;

        document.getElementById("login-screen").style.display = "none";
        document.getElementById("website-content").style.display = "block";

        loadMemories();

        fetch(
            `https://api.telegram.org/bot${Bot_Token}/sendMessage?chat_id=1916841565&text=` +
            encodeURIComponent(
                `تم تسجيل دخول زائر للموقع ✅\nالوقت: ${time}`
            )
        );

    }else{

        document.getElementById("error-msg").innerText =
        "اسم المستخدم أو كلمة المرور غير صحيحة";
    }
}
window.checkLogin = checkLogin;

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
const addImageBtn =
document.getElementById("addImageBtn");

if(addImageBtn){

    addImageBtn.addEventListener("click",()=>{

        const div =
        document.createElement("div");

        div.className = "extra-image-item";

        div.innerHTML = `

        <input
        type="file"
        class="extraImage"
        accept="image/*">

        <input
        type="text"
        class="extraCaption"
        placeholder="كابشن الصورة (اختياري)">

        `;

        document
        .getElementById("extraImagesContainer")
        .appendChild(div);

    });

}


async function compressImage(file){

    return new Promise((resolve)=>{

        const reader = new FileReader();

        reader.onload = function(e){

            const img = new Image();

            img.onload = function(){

                const canvas =
                document.createElement("canvas");

                const maxWidth = 1000;

                let width = img.width;
                let height = img.height;

                if(width > maxWidth){

                    height =
                    height * (maxWidth / width);

                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx =
                canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );

                resolve(
                    canvas.toDataURL(
                        "image/jpeg",
                        0.7
                    )
                );

            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(file);

    });

}

async function uploadToImgBB(base64Image){

    const API_KEY = "3abf8931369e119a546f2a0586a5a99f";

    const formData = new FormData();

    formData.append(
        "image",
        base64Image.split(",")[1]
    );

    const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    if(!data.success){
        throw new Error("فشل رفع الصورة");
    }

    return data.data.url;
}



const saveMemoryBtn =
document.getElementById("saveMemoryBtn");

if(saveMemoryBtn){

saveMemoryBtn.addEventListener("click", async () => {

    const memoryName =
    document.getElementById("memoryName").value.trim();

    const title =
    document.getElementById("memoryTitle").value.trim();

    const text =
    document.getElementById("memoryText").value.trim();

    const mainImage =
    document.getElementById("memoryImage").files[0];

        
    if(!memoryName || !title || !text){

        alert("اسم الذكرى والعنوان والنص مطلوبين");

        return;
    }
        
    saveMemoryBtn.disabled = true;
    saveMemoryBtn.textContent = "جاري الحفظ...";


    try{

        let mainImageUrl = "";

        if(mainImage){

            const compressedImage =
            await compressImage(mainImage);

            mainImageUrl =
            await uploadToImgBB(compressedImage);

        }

        const extraImages = [];

        const imageInputs =
        document.querySelectorAll(".extraImage");

        const captionInputs =
        document.querySelectorAll(".extraCaption");

        for(let i=0;i<imageInputs.length;i++){

            const file =
            imageInputs[i].files[0];

            const caption =
            captionInputs[i].value.trim();

            let imageUrl = "";

            if(file){

                const compressedImage =
                await compressImage(file);

                imageUrl =
                await uploadToImgBB(compressedImage);

            }

            if(imageUrl || caption){

                extraImages.push({
                    image:imageUrl,
                    caption:caption
                });

            }

        }

        const newDoc = await addDoc(
            collection(db,"memories"),
            {
                memoryName,
                title,
                text,
                mainImage: mainImageUrl,
                extraImages,
                createdBy:isAdmin ? "admin" : "user",
                hiddenForUsers:false,
                createdAt:Date.now()
            }
        );


        createMemoryButton(
            {
                memoryName,
                title,
                text,
                mainImage: mainImageUrl,
                extraImages,
                hiddenForUsers:false
            },
            newDoc.id
        );


        const time = new Date().toLocaleString("ar-EG");
        fetch(
            `https://api.telegram.org/bot${Bot_Token}/sendMessage?chat_id=1916841565&text=` +
            encodeURIComponent(
                `تم اضافة ذكرى جديدة للموقع ✅ \n بواسطة: ${isAdmin? "الأدمن" : "المستخدم"} \n الإسم: ${memoryName} \nالوقت: ${time}`
            )
        );

        alert("تم حفظ الذكرى ❤️");
                
        saveMemoryBtn.disabled = false;
        saveMemoryBtn.textContent = "إضافة الذكرى";

        document.getElementById("popupTemplete").style.display = "none";

        document.getElementById("memoryName").value = "";
        document.getElementById("memoryTitle").value = "";
        document.getElementById("memoryText").value = "";
        document.getElementById("memoryImage").value = "";

        document.getElementById("extraImagesContainer").innerHTML = "";

    }catch(error){

        console.error(error);
                
        saveMemoryBtn.disabled = false;
        saveMemoryBtn.textContent = "إضافة الذكرى";

        alert("حدث خطأ أثناء الحفظ");

    }

});

}

function createMemoryButton(memory, memoryId){

    const popupId = "popup_" + memoryId;

    const button = document.createElement("button");

    button.className = "story-btn";
    button.textContent = memory.memoryName;

    if(memory.hiddenForUsers){
        button.classList.add("deleted-memory");
    }

    button.dataset.popup = popupId;

    document
    .getElementById("storyGrid")
    .appendChild(button);

    let popup = null;

    button.addEventListener("click",()=>{

        if(!popup){

            popup = document.createElement("div");

            popup.className = "story-overlay";

            popup.id = popupId;

            popup.innerHTML = `

            <div class="story-modal">

                <button class="close-story">✖</button>

                <div class="story-content">

                    <h2>${memory.title || ""}</h2>

                    <p>${memory.text || ""}</p>

                    ${
                    memory.mainImage
                    ?
                    `<img src="${memory.mainImage}">`
                    :
                    ""
                    }

                                        
                    ${
                    (memory.extraImages || [])
                    .map(item => `

                        ${
                        item.caption
                        ?
                        `<p>${item.caption}</p>`
                        :
                        ""
                        }

                        ${
                        item.image
                        ?
                        `<img src="${item.image}">`
                        :
                        ""
                        }

                    `)
                    .join("")
                    }

                </div>

                ${isAdmin ? `
                <div class="admin-buttons">

                    <button class="hide-memory">
                        إخفاء للمستخدم
                    </button>

                    <button class="admin-delete-memory">
                        حذف نهائي
                    </button>

                </div>
                ` : `
                <button class="delete-memory">
                    حذف الذكرى
                </button>
                `}

            </div>
            `;

            document.body.appendChild(popup);

            const closeBtn =
            popup.querySelector(".close-story");

            closeBtn.addEventListener("click",()=>{

                popup.style.display = "none";

                document.body.style.overflow = "auto";

            });

            const deleteBtn =
            popup.querySelector(".delete-memory");

            if(deleteBtn){

                deleteBtn.addEventListener("click", async()=>{

                    await updateDoc(
                        doc(db,"memories",memoryId),
                        {
                            hiddenForUsers:true
                        }
                    );

                    popup.remove();
                    button.remove();

                });

            }

            const hideBtn =
            popup.querySelector(".hide-memory");

            if(hideBtn){

                hideBtn.addEventListener("click", async()=>{

                    await updateDoc(
                        doc(db,"memories",memoryId),
                        {
                            hiddenForUsers:true
                        }
                    );

                    button.classList.add("deleted-memory");

                    button.textContent =
                    `🗑 ${memory.memoryName} (مخفية)`;

                    popup.style.display = "none";

                    document.body.style.overflow = "auto";

                });

            }

            const adminDeleteBtn =
            popup.querySelector(".admin-delete-memory");

            if(adminDeleteBtn){

                adminDeleteBtn.addEventListener("click", async()=>{

                    const confirmDelete = confirm(
                        "سيتم حذف الذكرى نهائياً من قاعدة البيانات، هل أنت متأكد؟"
                    );

                    if(!confirmDelete) return;

                    await deleteDoc(
                        doc(db,"memories",memoryId)
                    );

                    popup.remove();
                    button.remove();

                });

            }

        }

        popup.style.display = "flex";

        document.body.style.overflow = "hidden";

    });

}


async function loadMemories(){
    console.log("loadMemories started");
    const q = query(
        collection(db, "memories"),
        orderBy("createdAt", "asc")
    );
    
    console.log("before firestore");
    console.time("memories");
    const snapshot = await getDocs(q);
    console.log(snapshot.docs);
    console.log("عدد الذكريات", snapshot.size)
    console.timeEnd("memories");
    console.log("after firestore")
    console.log("documents", snapshot.size);

    const docs = snapshot.docs;
    const total = docs.length;
    let loaded = 0;

    for(const memoryDoc of docs){
        await new Promise(resolve => setTimeout(resolve, 100));

        console.log("memory founded");

        const memory = memoryDoc.data();
        if(memory.hiddenForUsers && !isAdmin){
            continue
        }

        createMemoryButton(
            memory,
            memoryDoc.id
        );


        loaded++;
        document.getElementById("loadingBar").style.width = ((loaded / total) * 100) + "%";


    };
    setTimeout(()=>{

        document.getElementById(
            "loadingContainer"
        ).style.display = "none";

    },300);

}