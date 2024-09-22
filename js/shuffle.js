function initShuffle() {
    let Shuffle = window.Shuffle;
    let element = document.querySelector('.shuffle-container');

    let shuffleInstance = new Shuffle(element, {
        itemSelector: '.project-item'
    });

    let filters = document.querySelectorAll(".shuffle-filter li");

    filters.forEach(f => {
        f.addEventListener("click", (e) => {
            e.preventDefault();
            if (f.classList.contains("selected")) {
                f.classList.remove("selected")
                shuffleInstance.filter();
                return;
            }

            filters.forEach(eachF => {
                eachF.classList.remove("selected");
            });

            f.classList.add("selected");

            let keyword = f.getAttribute("data-target");
            shuffleInstance.filter(keyword);
        })
    });

}