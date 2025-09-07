# Project Name:

## Project Description:  

## Features:
  
## Live Site Link:

## Project Video:

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

