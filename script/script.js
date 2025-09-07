const loadCategoryButtons = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const data = await res.json("")
    displayCategoryButtons(data.data)
}
loadCategoryButtons()

const displayCategoryButtons = (categoryData) => {
    const categoryButtonContainer = document.getElementById("category-button-container");

    for (let data of categoryData) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex items-center gap-1 hover:text-white btn btn-primary btn-outline">
            <i class="fa-solid fa-book-open"></i>
            <p class="text-sm font-semibold">Lesson-${data.level_no}</p>
        </div>
        `
        categoryButtonContainer.appendChild(div)

    }
}