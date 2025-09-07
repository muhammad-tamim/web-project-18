const loadCategoryButtons = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const data = await res.json("")
    displayCategoryButtons(data.data)
}
loadCategoryButtons()


const displayCategoryButtons = (categoryButtonsData) => {
    const categoryButtonContainer = document.getElementById("category-button-container");

    for (let data of categoryButtonsData) {
        const div = document.createElement("div");
        div.innerHTML = `
        <button id="${data.level_no}" class="flex items-center gap-1 hover:text-white btn btn-primary btn-outline">
            <i class="fa-solid fa-book-open"></i>
            <p class="text-sm font-semibold">Lesson-${data.level_no}</p>
        </button>
        `
        categoryButtonContainer.appendChild(div)

        // load category data 
        document.getElementById(data.level_no).addEventListener("click", () => {
            showLoadingSpinner()
            fetch(`https://openapi.programming-hero.com/api/level/${data.level_no}`)
                .then(res => res.json())
                .then(data => displayCategoryCard(data.data))
        })
    }
}

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
                    class="bg-[#1A91FF10] rounded-xl p-4 text-[#374957] cursor-pointer text-2xl fa-solid fa-circle-info"></i>
                <i
                    class="bg-[#1A91FF10] rounded-xl p-4 text-[#374957] cursor-pointer text-2xl fa-solid fa-volume-high"></i>
        
            </div>
        </div>
        `
        hideLoadingSpinner()
        cardContainer.appendChild(div)
    }
}

