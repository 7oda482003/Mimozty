import {
  db,
  auth,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";


let isAdmin = false;
const Bot_Token = "8725319187:AAFZFK8bsvzvAgDtwz_eojm_xWTDXjWjPwk";
const Chat_Id = "1916841565";




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// تسجيل الدخول
async function checkLogin(){

    const time = new Date().toLocaleString("ar-EG")

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();


    let email = "";
    if(username === "محمود"){
        email = "محمود@mimoza.com";
    }
    else if(username === "ميموزتي"){
        email = "ميموزتي@mimoza.com";
    }
    else{
        document.getElementById("error-msg").innerText =
        "اسم المستخدم غير صحيح";
        return;
    }


    try{

        const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        isAdmin =
        email === "محمود@mimoza.com";

        document.getElementById("login-screen").style.display = "none";

        document.getElementById("website-content").style.display = "block";
        sessionStorage.setItem("username", username);
        loadMemories();
        fetch(
        `https://api.telegram.org/bot${Bot_Token}/sendMessage?chat_id=${Chat_Id}&text=` +
        encodeURIComponent(
            `تم تسجيل دخول ${isAdmin ? "الأدمن" : "المستخدم"} للموقع ✅\n\nالوقت: ${time}`
        )
        );

    }catch(error){

        document.getElementById("error-msg").innerText =
        "اسم المستخدم أو كلمة المرور غير صحيحة";

    }

}


window.checkLogin = checkLogin;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// الذكريات
// انشاء المربع
let editingMemoryId = null;
let editingMemory = null;
let editingButton = null;
let editingPopup = null;
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
// إضافة الصورة
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
        `;
        document
        .getElementById("extraImagesContainer")
        .appendChild(div);
    });
}
// ضغط الصورة
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
// يحملها علي التخزين
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
// إضافة النص الاضافي
const addTextBtn =
document.getElementById("addTextBtn");


if(addTextBtn){

    addTextBtn.addEventListener("click",()=>{


        const div =
        document.createElement("div");


        div.className =
        "extra-text-item";


        div.innerHTML = `
            <textarea
            class="extraText"
            placeholder="النص الإضافي">
            </textarea>
        `;


        document
        .getElementById("extraImagesContainer")
        .appendChild(div);


    });

}

// حفظ الذكرى
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
    console.log("mainImage =", mainImage);
    if(editingMemoryId){
        console.log("قبل التعديل", editingMemoryId);
        saveMemoryBtn.disabled = true;
        saveMemoryBtn.textContent = "جاري حفظ التعديل...";
        const updatedExtraContent = [];
        const items =
        document.querySelectorAll(
        "#extraImagesContainer > div"
        );


        for(const item of items){


        const img =
        item.querySelector(".extraImage");


        const txt =
        item.querySelector(".extraText");


        if(txt && txt.value.trim()){

        updatedExtraContent.push({
        type:"text",
        value:txt.value.trim()
        });

        }


        if(img && img.files[0]){


        const compressedImage =
        await compressImage(img.files[0]);


        const imageUrl =
        await uploadToImgBB(compressedImage);


        updatedExtraContent.push({
        type:"image",
        value:imageUrl
        });


        }
        else{

        const old =
        item.querySelector(".oldImageUrl");


        if(old && old.value){

        updatedExtraContent.push({
        type:"image",
        value:old.value
        });

        }

        }

        }
        
        let updatedMainImage = editingMemory.mainImage;
        if(mainImage){
            const compressedImage =
            await compressImage(mainImage);
            updatedMainImage =
            await uploadToImgBB(compressedImage);
        }
        let updateData = {
            memoryName,
            title,
            text,
            mainImage: updatedMainImage,
            extraContent: updatedExtraContent
        };
        await updateDoc(
            doc(db,"memories",editingMemoryId),
            updateData
        );
        editingMemory.memoryName = memoryName;
        editingMemory.title = title;
        editingMemory.text = text;
        editingMemory.mainImage = updatedMainImage;
        editingMemory.extraContent = updatedExtraContent;
        editingButton.textContent = memoryName;
        if(updateData.mainImage){
            editingMemory.mainImage =
            updateData.mainImage;
            const img =
            editingPopup.querySelector(
                ".story-content img"
            );
            if(img){
                img.src = updateData.mainImage;
            }
        }
        const storyContent =
        editingPopup.querySelector(".story-content");
        storyContent.innerHTML = `
            <h2>${title}</h2>
            <p>${text}</p>
            ${
                updatedMainImage
                ?
                `<img src="${updatedMainImage}">`
                :
                ""
            }
            ${
                updatedExtraContent
                .map(item => `
                    ${
                        item.type === "image"
                        ?
                        `<img src="${item.value}">`
                        :
                        `<p>${item.value}</p>`
                    }
                `)
                .join("")
            }
        `;
        saveMemoryBtn.disabled = false;
        saveMemoryBtn.textContent = "حفظ التعديل";
        alert("تم تعديل الذكرى");
        document.getElementById(
            "popupTemplete"
        ).style.display = "none";
        editingMemoryId = null;
        editingMemory = null;
        editingButton = null;
        editingPopup = null;
        document.getElementById("memoryName").value = "";
        document.getElementById("memoryTitle").value = "";
        document.getElementById("memoryText").value = "";
        document.getElementById("memoryImage").value = "";
        document.getElementById(
            "extraImagesContainer"
        ).innerHTML = "";
        const preview =
        document.getElementById("currentMainImage");
        if(preview){
            preview.src = "";
            preview.style.display = "none";
        }
        document.querySelector(
            ".memory-form h3"
        ).textContent = "إضافة ذكرى جديدة";
        document.getElementById(
            "saveMemoryBtn"
        ).textContent = "إضافة الذكرى";
        return;
    }
    if(editingPopup){
        editingPopup.querySelector("h2").textContent = title;
        const firstParagraph =
        editingPopup.querySelector(".story-content p");
        if(firstParagraph){
            firstParagraph.textContent = text;
        }
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
        const extraContent = [];

        const extraItems =
        document.querySelectorAll(
            "#extraImagesContainer > div"
        );


        for(const item of extraItems){


            const img =
            item.querySelector(".extraImage");


            const txt =
            item.querySelector(".extraText");



            if(txt && txt.value.trim()){

                extraContent.push({
                    type:"text",
                    value:txt.value.trim()
                });

            }



            if(img && img.files[0]){


                const compressedImage =
                await compressImage(
                    img.files[0]
                );


                const imageUrl =
                await uploadToImgBB(
                    compressedImage
                );


                extraContent.push({
                    type:"image",
                    value:imageUrl
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
                extraContent,
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
                extraContent,
                hiddenForUsers:false
            },
            newDoc.id
        );
        const time = new Date().toLocaleString("ar-EG");
        fetch(
            `https://api.telegram.org/bot${Bot_Token}/sendMessage?chat_id=${Chat_Id}&text=` +
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
        const preview =
        document.getElementById("currentMainImage");
        if(preview){
            preview.src = "";
            preview.style.display = "none";
        }
    }catch(error){
        console.error(error);
        saveMemoryBtn.disabled = false;
        saveMemoryBtn.textContent = "إضافة الذكرى";
        alert("حدث خطأ أثناء الحفظ");
    }
});
}
// اضافة الذكرى في المربع
function createMemoryButton(memory, memoryId){
    const popupId = "popup_" + memoryId;
    const button = document.createElement("button");
    button.className = "story-btn";
    button.textContent = memory.memoryName;
    if(memory.hiddenForUsers){
        button.classList.add("deleted-memory");
    }
    button.dataset.popup = popupId;
    function updateStoryCount() {
        const count = document.querySelectorAll(
            '.story-btn:not(#addMemoryBtn)'
        ).length;
        document.getElementById(
            "ourStoryCount"
        ).textContent = count;
    }
    document
    .getElementById("storyGrid")
    .appendChild(button);
    updateStoryCount();
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
                    (memory.extraContent || [])
                    .map(item => `
                        ${
                        item.type === "image"
                        ?
                        `<img src="${item.value}">`
                        :
                        `<p>${item.value}</p>`
                        }
                    `)
                    .join("")
                    }
                    ${
                    (memory.extraTexts || [])
                    .map(text=>`
                    <p>${text}</p>
                    `)
                    .join("")
                    }
                </div>
                ${isAdmin ? `
                <div class="admin-buttons">
                    <button class="edit-memory">
                        تعديل الذكرى
                    </button>
                    <button class="hide-memory">
                        إخفاء للمستخدم
                    </button>
                    <button class="admin-delete-memory">
                        حذف نهائي
                    </button>
                </div>
                ` : `
                <div class="user-button">
                <button class="edit-memory">
                تعديل الذكرى
                </button>
                <button class="delete-memory">
                    حذف الذكرى
                </button>
                </div>
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
                    updateStoryCount();
                });
            }
            const editBtn =
            popup.querySelector(".edit-memory");
            if(editBtn){
                editBtn.addEventListener("click",()=>{
                    editingMemoryId = memoryId;
                    editingMemory = memory;
                    editingButton = button;
                    editingPopup = popup;
                    document.getElementById(
                        "memoryName"
                    ).value = memory.memoryName || "";
                    document.getElementById(
                        "memoryTitle"
                    ).value = memory.title || "";
                    document.getElementById(
                        "memoryText"
                    ).value = memory.text || "";
                    const preview =
                    document.getElementById(
                        "currentMainImage"
                    );
                    if(memory.mainImage){
                        preview.src = memory.mainImage;
                        preview.style.display = "block";
                    }else{
                        preview.style.display = "none";
                    }
                    document.querySelector(
                        ".memory-form h3"
                    ).textContent = "تعديل الذكرى";
                    document.getElementById(
                        "saveMemoryBtn"
                    ).textContent = "حفظ التعديل";
                    document.getElementById(
                        "popupTemplete"
                    ).style.display = "flex";
                    popup.style.display = "none";
                    document.getElementById(
                        "extraImagesContainer"
                    ).innerHTML = "";
                    (memory.extraContent || []).forEach(item => {

                        const div =
                        document.createElement("div");


                        div.className =
                        "extra-image-item";


                        if(item.type === "image"){

                            div.innerHTML = `

                            <img
                            src="${item.value}"
                            class="edit-preview"
                            style="
                            width:100px;
                            display:block;
                            margin:10px 0;
                            ">


                            <input
                            type="hidden"
                            class="oldImageUrl"
                            value="${item.value}">


                            <input
                            type="file"
                            class="extraImage"
                            accept="image/*">


                            <button
                            type="button"
                            class="remove-extra-image">
                            حذف الصورة
                            </button>

                            `;


                        }


                        if(item.type === "text"){

                            div.innerHTML = `

                            <textarea
                            class="extraText"
                            placeholder="النص الإضافي">
                            ${item.value}
                            </textarea>


                            <button
                            type="button"
                            class="remove-extra-text">
                            حذف النص
                            </button>

                            `;

                        }


                        document
                        .getElementById(
                            "extraImagesContainer"
                        )
                        .appendChild(div);


                    });
                    document
                    .querySelectorAll(
                        ".remove-extra-image"
                    )
                    .forEach(btn => {
                        btn.addEventListener(
                            "click",
                            () => {
                                btn
                                .closest(
                                    ".extra-image-item"
                                )
                                .remove();
                            }
                        );
                    });
                    document
                    .querySelectorAll(
                        ".remove-extra-text"
                    )
                    .forEach(btn => {

                        btn.addEventListener(
                            "click",
                            () => {

                                btn.closest(
                                    ".extra-image-item"
                                ).remove();

                            }
                        );

                    });
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
                    updateStoryCount();
                });
            }
        }
        popup.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
}
// اضافة الذكرى
document.getElementById("addMemoryBtn")
.addEventListener("click", () => {

    editingMemoryId = null;
    editingMemory = null;
    editingButton = null;
    editingPopup = null;

    document.getElementById("memoryName").value = "";
    document.getElementById("memoryTitle").value = "";
    document.getElementById("memoryText").value = "";
    document.getElementById("memoryImage").value = "";

    document.getElementById(
        "extraImagesContainer"
    ).innerHTML = "";

    const preview =
    document.getElementById("currentMainImage");

    if(preview){
        preview.src = "";
        preview.style.display = "none";
    }

    document.querySelector(
        ".memory-form h3"
    ).textContent = "إضافة ذكرى جديدة";

    document.getElementById(
        "saveMemoryBtn"
    ).textContent = "إضافة الذكرى";

    document.getElementById(
        "popupTemplete"
    ).style.display = "flex";

});

// تحميل الذكريات
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
        console.log(memoryDoc.id);
        // const memory = memoryDoc.data();
        console.log("ORDER =", memory.order);
        console.log(memory);
    };
    // updateStoryCount();
    setTimeout(()=>{
        document.getElementById(
            "loadingContainer"
        ).style.display = "none";
    },300);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// الهدايا

let deviceId =
localStorage.getItem("deviceId");

if(!deviceId){

    deviceId =
    Date.now().toString(36) +
    Math.random().toString(36).slice(2);

    localStorage.setItem(
        "deviceId",
        deviceId
    );
}


const giftMessages = [

    "بحبك 🤍",

    "مشتاق ليكي 🥺",

    "وحشتيني ❤️",

    "ربنا يخليكي ليا 🤲",

    "انتي أجمل حاجة حصلتلي 🌿",

    "أنا مش محتاج أشوفك كل يوم عشان أحبك، أنا محتاجك بس عشان قلبي يفضل مطمن 🤍",

    "كل مرة بدعي فيها ربنا، بيكون اسمك حاضر في الدعاء قبل اسمي أحيانًا 🤲",

    "الناس بتدور على الراحة في أماكن كتير... وأنا لقيتها في فكرة إنك موجودة ❤️",

    "مفيش كلمة تقدر توصف مكانتك عندي، عشان أي كلمة هتبقى أقل من الحقيقة 🌿",

    "ربنا يعلم إني ما تمنيت حد في حياتي قد ما تمنيتك انتي 🥺",

    "مش عارف إزاي شخص متكلمتش معاه كتير يبقى أغلى من ناس عرفتهم سنين 🤍",

    "كل ما أفكر فيكي أتأكد إن ربنا رزقني بشعور جميل حتى لو لسه مكتملش 🌿",

    "انتي أول حد دعيت ربنا بيه من قلبي بالشكل ده 🤲",

    "في ناس بتدخل حياتنا عادي... وانتي دخلتي قلبي مباشرة ❤️",

    "أوقات كتير ببقى تعبان من كل حاجة، وفكرة إنك موجودة في الدنيا بتطمني 🥺",

    "لو خيروني بين ألف أمنية، هختار الأمنية اللي فيها انتي وبس 🤍",

    "كل يوم بعدي بيقربني من حلم إني أقولك: الحمد لله إنك بقيتي حلالي 🌹",

    "مش أجمل حاجة فيكي شكلك ولا كلامك... أجمل حاجة فيكي الأثر اللي بتسيبيه في قلبي 🌿",

    "يمكن بينا مسافات وأيام طويلة، بس مفيش يوم بيعدي من غير ما أفكر فيكي ❤️",

    "لو كان للحب عنوان، فالعنوان بالنسبالي هيكون اسمك انتي 🤍",

    "بحبك أكتر مما تتخيلي، وأكتر مما أقدر أوصف بالكلام 🤍",

    "كل يوم بيعدي بتأكديلي إنك أجمل هدية من ربنا ليا 🌿",

    "وجودك في حياتي لوحده كفاية يخلي أي يوم صعب يعدي بسهولة ❤️",

    "لما بفكر في مستقبلي بلاقيك أول حاجة فيه وآخر حاجة فيه 🥺",

    "مش عاوز من الدنيا غير إنك تفضلي جنبي دايمًا 🤍",

    "في وسط كل الناس، قلبي اختارك انتي من غير ما يتردد لحظة 🌹",

    "كل حاجة حلوة بشوفها بتفكرني بيكي، وكل حاجة وحشة بتهون لما أفتكرك ❤️",

    "لو كان ليا أمنية واحدة بس، فهي إني أشوفك سعيدة طول عمرك 🤲",

    "ممكن أعيش من غير حاجات كتير، لكن مش متخيل حياتي من غيرك 🌷",

    "انتي مش مجرد شخص بحبه، انتي راحتي وطمأنينتي وكل حاجة جميلة في حياتي 🤍"

];


const overlay1 =
document.getElementById("giftOverlay");

const messageElement =
document.getElementById("giftMessage");

const giftBtn =
document.getElementById("giftBtn1");

const closeBtn1 =
document.getElementById("closeGiftOverlay");

function typeText(text){

    messageElement.textContent = "";

    let i = 0;

    const timer = setInterval(()=>{

        messageElement.textContent +=
        text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(timer);
        }

    },70);
}


function getTodayKey() {

    const today = new Date();

    return `${today.getFullYear()}-${
        today.getMonth() + 1
    }-${today.getDate()}`;
}

function getDailyMessage() {

    const todayKey =
    getTodayKey();

    const savedDate =
    localStorage.getItem(
        "giftDate"
    );

    const savedMessage =
    localStorage.getItem(
        "giftMessage"
    );

    if(
        savedDate === todayKey &&
        savedMessage
    ){
        return savedMessage;
    }

    let usedMessages =
    JSON.parse(
        localStorage.getItem(
            "usedMessages"
        )
    ) || [];

    if(
        usedMessages.length >=
        giftMessages.length
    ){
        usedMessages = [];
    }

    const availableMessages =
    giftMessages.filter(
        msg =>
        !usedMessages.includes(msg)
    );

    const randomMessage =
    availableMessages[
        Math.floor(
            Math.random() *
            availableMessages.length
        )
    ];

    usedMessages.push(
        randomMessage
    );

    localStorage.setItem(
        "usedMessages",
        JSON.stringify(
            usedMessages
        )
    );

    localStorage.setItem(
        "giftDate",
        todayKey
    );

    localStorage.setItem(
        "giftMessage",
        randomMessage
    );

    return randomMessage;
}

giftBtn.addEventListener("click",()=>{

    overlay1.classList.add("active");

    const selectedMessage =
     getDailyMessage();

    const todayKey = 
    getTodayKey();

    const sessionKey =
    `${deviceId}_${isAdmin ? "admin" : "user"}`  

    const countDate = 
    localStorage.getItem(
        `giftCountDate_${sessionKey}`
    );

    if(countDate !== todayKey){

        localStorage.setItem(
            `giftCount_${sessionKey}`,
            0
        );

        localStorage.setItem(
            `giftCountDate_${sessionKey}`,
            todayKey
        );
    }

    let giftCount = 
    parseInt(localStorage.getItem(
        `giftCount_${sessionKey}`
    )) || 0;

    giftCount++;

    localStorage.setItem(
        `giftCount_${sessionKey}`,
        giftCount
    );

    typeText(selectedMessage);
      

    const savedDate =
    localStorage.getItem(
        `giftTelegramDate_${sessionKey}`
    );

    const savedMessageId =
    localStorage.getItem(
        `giftTelegramMessageId_${sessionKey}`
    );

    const time = new Date().toLocaleString("ar-EG");

    const telegramText = `🎁هديتي ليكي: \n\n ${isAdmin? "أدمن" : "مستخدم"} \n\n الجهاز:${deviceId.slice(0,8)} \n\n 💌 رسالة اليوم: ${selectedMessage} \n\n 🔢 عدد مرات الفتح: ${giftCount} \n\n 🕒 الوقت: ${time}`

    if(
        savedDate !== todayKey ||
        !savedMessageId
    ){

        fetch(
            `https://api.telegram.org/bot${Bot_Token}/sendMessage`,
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    chat_id: Chat_Id,

                    text: telegramText
                })
            }
        )
        .then(res => res.json())

        .then(data => {

            if(data.ok){

                localStorage.setItem(
                    `giftTelegramDate_${sessionKey}`,
                    todayKey
                );

                localStorage.setItem(
                    `giftTelegramMessageId_${sessionKey}`,
                    data.result.message_id
                );
            }
        });
    }else{

        fetch(
            `https://api.telegram.org/bot${Bot_Token}/editMessageText`,
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    chat_id: Chat_Id,

                    message_id:
                    parseInt(savedMessageId),

                    text: telegramText
                })
            }
        );
    }
});

closeBtn1.addEventListener("click",()=>{

    overlay1.classList.remove("active");
});

overlay1.addEventListener("click",(e)=>{

    if(
        e.target === overlay1
    ){
        overlay1.classList.remove("active");
    }
});




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// اللغز

const showGiftBtn = document.getElementById("showGiftBtn");
const passwordSection = document.getElementById("passwordSection");
const giftContent = document.getElementById("giftContent");
const errorMsg = document.getElementById("errorMsg");

const giftPopup =
document.getElementById("giftPopup");

const closeGift =
document.getElementById("closeGift");

showGiftBtn.addEventListener("click", () => {

    giftPopup.style.display = "flex";

    document.body.style.overflow = "hidden";

});

closeGift.addEventListener("click", () => {

    giftPopup.style.display = "none";

    document.body.style.overflow = "auto";

});

window.checkGift = async function () {

    const password =
    document.getElementById("giftPassword").value.trim();

    try {

        const giftDoc = await getDoc(
            doc(db, "settings", "gift")
        );
        console.log("exists", giftDoc.exists());
        console.log("data", giftDoc.data());

        if (!giftDoc.exists()) {

            errorMsg.textContent =
            "لم يتم العثور على إعدادات الهدية";

            return;
        }

        const firebasePassword =
        giftDoc.data().password;
        console.log("Entered Password:", password);

        console.log("Firebase Password:", firebasePassword);
        if (password === firebasePassword) {

            document.getElementById(
                "passwordSection"
            ).style.display = "none";

            document.getElementById(
                "giftContent"
            ).style.display = "block";

            errorMsg.textContent = "";

            const time =
            new Date().toLocaleString("ar-EG");

            const user =
            sessionStorage.getItem("username") ||
            "مستخدم غير معروف";

            fetch(
                `https://api.telegram.org/bot${Bot_Token}/sendMessage?chat_id=${Chat_Id}&text=` +
                encodeURIComponent(
                    `تم فتح الهدية السرية 🎁\nبواسطة: ${user}\nالوقت: ${time}`
                )
            );

        } else {

            errorMsg.textContent =
            "كلمة السر غير صحيحة ❌";

        }

    } catch (error) {

        console.error(error);

        errorMsg.textContent =
        "حدث خطأ أثناء التحقق";

    }
};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// الرسالة السرية

const secretBtn = document.getElementById("secretBtn");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

secretBtn.addEventListener("click", () => {
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
    const time = new Date().toLocaleString("ar-EG");
        fetch(
            `https://api.telegram.org/bot${Bot_Token}/sendMessage?chat_id=${Chat_Id}&text=` +
            encodeURIComponent(
                `تم فتح الرسالة السرية ✅ \n بواسطة: ${isAdmin? "الأدمن" : "المستخدم"} \nالوقت: ${time}`
            )
        );
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

