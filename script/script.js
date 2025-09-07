// login

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


// logout
document.getElementById("logout").addEventListener("click", () => {
    document.getElementById("banner").classList.remove("hidden")
    document.getElementById("navbar").classList.add("hidden")
    document.getElementById("main").classList.add("hidden")
})






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
        <button id="${data.level_no}" class="active flex items-center gap-1 hover:text-white btn btn-primary btn-outline">
            <i class="fa-solid fa-book-open"></i>
            <p class="text-sm font-semibold">Lesson-${data.level_no}</p>
        </button>
        `
        categoryButtonContainer.appendChild(div)

        document.getElementById(data.level_no).addEventListener("click", (e) => {
            // set active style to the button
            document.querySelectorAll(".active").forEach((btn) => {
                btn.classList.add("btn-outline")
                btn.classList.add("hover:text-white")
                btn.classList.remove("text-white")
            })
            e.target.classList.remove("btn-outline")
            e.target.classList.remove("hover:text-white")
            e.target.classList.add("text-white")


            // load category data
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

const loadCategoryDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    const data = await res.json()
    displayCategoryDetailsInModal(data.data)
}

const displayCategoryDetailsInModal = (data) => {
    const modalDetailsContainer = document.getElementById("modal-details-container")



    const div = document.createElement("div");



    div.innerHTML = `
    
<div class="space-y-6">
    <div class="border border-[#EDF7FF] p-6 rounded-xl space-y-8">
        <h1 class="font-semibold text-4xl">${data.word} (<i class="fa-solid fa-microphone-lines"></i>
            :${data.pronunciation})
        </h1>
        <div>
            <h2 class="font-semibold text-2xl pb-2.5">Meaning</h2>
            <p class="font-medium">${data.meaning}</p>
        </div>
        <div>
            <h2 class="font-semibold text-2xl pb-2.5">Example</h2>
            <p class="font-medium">${data.sentence}</p>
        </div>
        <div>
            <h2 class="font-medium text-2xl pb-2.5">সমার্থক শব্দ গুলো</h2>
            <div class="synonyms-container flex flex-wrap gap-4">

                        
                    </div>
            </div>
        </div>
        <div>
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary text-white btn-sm">Complete Learning</button>
            </form>
        </div>
    </div>

    `
    modalDetailsContainer.appendChild(div)

    // add synonyms to the modal
    const synonymsContainer = document.querySelector(".synonyms-container")

    const synonyms = data.synonyms

    synonyms.forEach(word => {
        const div = document.createElement("div");

        div.innerHTML = `
        <p class="py-2 px-3 bg-[#EDF7FF] border border-[#D7E4EF] rounded-md text-xs">${word}</p>
        `
        synonymsContainer.appendChild(div)
    });

    document.getElementById("my_modal_1").showModal()
}
