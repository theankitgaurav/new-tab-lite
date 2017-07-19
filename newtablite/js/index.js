// Disable the default context manus
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
}, false)

// Add click event listeners to footer launchButtons
for (let el of document.getElementsByClassName("launchButton")) {
    el.addEventListener("click", (event) => {
        openLink(event.target.getAttribute("data-url"))
    })
}