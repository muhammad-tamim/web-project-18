# Project Name: English জানালা

## Project Description:  
English জানালা is a web-based vocabulary learning application built with HTML, Tailwind CSS, DaisyUI, and JavaScript. I created this project to practice API fetching, DOM manipulation, event handling, and implementing interactive features like i can log in and log out with proper input validation using SweetAlert, view vocabularies by category with a single click, see full word details by clicking the info icon, and hear the pronunciation of selected words using the browser’s Web Speech API.

## Live Site Link:
https://web-project-18.netlify.app/

## Project Video:


https://github.com/user-attachments/assets/f15db262-902f-448c-9189-f55f750269fd


## Features:
- I can login / logout with proper input validation with sweet alert instead of browser default alert
- I can see vocabularies based on their categories with just clicking categories button
- I can see vocabularies full details by just clicking the info icon
- I can here the pronunciation selected of words by the help of browser web speech api


## What I Learned New while Building This Project:
1. When i try to init the project i got this warnings: 

```bash
git muhammad-tamim@Inspiron-3421:~/programming/personal project/web-project-18$ git init
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint: 
hint:   git config --global init.defaultBranch <name>
hint: 
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint: 
hint:   git branch -m <name>
```

so,i use, below command to make every new repo start with main instead of master.

```bash
git config --global init.defaultBranch main
```
2. how to use Web Speech AP 
```js
const displayCategoryCard = (categoryData) => {
    const cardContainer = document.getElementById("card-container");

    cardContainer.innerHTML = "";

    if (categoryData.length === 0) {
        cardContainer.innerHTML = `
    <div class="col-span-3 text-center py-16 ">
        <div class="flex justify-center pb-4">
            <img src="assets/images/alert-error.png" alt="">
        </div>
        <p class="text-[#79716B] pb-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="text-[#292524] font-medium text-4xl">নেক্সট Lesson এ যান</h1>
    </div>
        `

        hideLoadingSpinner()
        return
    }

    for (let data of categoryData) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="p-14 bg-white rounded-xl text-center">
            <div class="space-y-6 pb-14">
                <h2 class="font-bold text-3xl text-black">${data.word}</h2>
                <p class="font-medium text-xs md:text-xl text-black">Meaning/Pronunciation</p>
                <h1 class="font-semibold text-base md:text-3xl text-[#18181B]">"${data.meaning} / ${data.pronunciation}"</h1>
            </div>
            <div class="flex justify-between items-center gap-1">
                <i
                    class="details-btn bg-[#1A91FF10] rounded-xl p-4 text-[#374957] cursor-pointer text-2xl fa-solid fa-circle-info"></i>
                <i 
                    class="voice-btn bg-[#1A91FF10] rounded-xl p-4 text-[#374957] cursor-pointer text-2xl fa-solid fa-volume-high"></i>
        
            </div>
        </div>
        `
        hideLoadingSpinner()
        cardContainer.appendChild(div)

        div.querySelector(".details-btn").addEventListener("click", () => {
            loadCategoryDetails(data.id)
        })

        div.querySelector(".voice-btn").addEventListener("click", () => {
            const utterance = new SpeechSynthesisUtterance(data.word);
            utterance.lang = 'en-EN';
            window.speechSynthesis.speak(utterance);
        })


    }
}
```

here, 
- ```new SpeechSynthesisUtterance(data.word)``` = This is a built-in browser object that represents a chunk of text you want the computer to speak.
- ```utterance.lang = 'en-EN'``` = This sets the language/accent of the voice. ('en-US', 'bn-BD' (Bangla), 'hi-IN' (Hindi), etc.)
- ```window.speechSynthesis.speak(utterance);``` = speechSynthesis is the speech engine built into the browser and .speak(utterance) tells the browser: “Hey, read this text out loud using the system’s text-to-speech voice.”
 
3. how to implement smooth scroll behavior
```css
    <style>
        html {
            scroll-behavior: smooth;
        }
    </style>
```
4. How to use sweet alert 2 as instead of browser default alert
```js
    <!-- Sweet Alert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
```
```js
document.getElementById("get-started-btn").addEventListener("click", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const password = document.getElementById("password").value

    if (name === "") {
        alert("Please enter your name")
        return
    }
    if (password != 123456) {
        alert("Please enter 123456")
        return
    }

    document.getElementById("banner").classList.add("hidden")
    document.getElementById("navbar").classList.remove("hidden")
    document.getElementById("main").classList.remove("hidden")

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome to the English জানালা",
        showConfirmButton: false,
        timer: 2000
    });
})
```

## Challenges I faced while Building This Project:
1. I firstly try to access a click details button using id like this: 
```js
for (let data of categoryData) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="p-14 bg-white rounded-xl text-center">
            <div class="space-y-6 pb-14">
                <h2 class="font-bold text-3xl text-black">${data.word}</h2>
                <p class="font-medium text-xs md:text-xl text-black">Meaning/Pronunciation</p>
                <h1 class="font-semibold text-base md:text-3xl text-[#18181B]">"${data.meaning} / ${data.pronunciation}"</h1>
            </div>
            <div class="flex justify-between items-center gap-1">
                <i id="${data.id}"
                    class=" bg-[#1A91FF10] rounded-xl p-4 text-[#374957] cursor-pointer text-2xl fa-solid fa-circle-info"></i>
                <i
                    class="bg-[#1A91FF10] rounded-xl p-4 text-[#374957] cursor-pointer text-2xl fa-solid fa-volume-high"></i>
        
            </div>
        </div>
        `
        hideLoadingSpinner()
        cardContainer.appendChild(div)

        document.getElementById(data.id).addEventListener((click), () => {
            console.log(data.id)
        })


    }
``` 

but it not worked because of  duplication id name,. so i use querySelector instead of id and it worked:
```js
for (let data of categoryData) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="p-14 bg-white rounded-xl text-center">
            <div class="space-y-6 pb-14">
                <h2 class="font-bold text-3xl text-black">${data.word}</h2>
                <p class="font-medium text-xs md:text-xl text-black">Meaning/Pronunciation</p>
                <h1 class="font-semibold text-base md:text-3xl text-[#18181B]">"${data.meaning} / ${data.pronunciation}"</h1>
            </div>
            <div class="flex justify-between items-center gap-1">
                <i
                    class="details-btn bg-[#1A91FF10] rounded-xl p-4 text-[#374957] cursor-pointer text-2xl fa-solid fa-circle-info"></i>
                <i
                    class="bg-[#1A91FF10] rounded-xl p-4 text-[#374957] cursor-pointer text-2xl fa-solid fa-volume-high"></i>
        
            </div>
        </div>
        `
        hideLoadingSpinner()
        cardContainer.appendChild(div)

        div.querySelector(".details-btn").addEventListener("click", () => {
            console.log(data.id)
        })


    }
``` 

## Contact With Me: 

tamim.muhammad2005@gmail.com | +8801586090360 (WhatsApp)  

https://www.linkedin.com/in/tamim-muhammad

---

Thank you so much for checking out my project! If you have any suggestions or feedback, feel free to share them.

