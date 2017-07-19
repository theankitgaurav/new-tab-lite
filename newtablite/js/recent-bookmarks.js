function fetchRecentBookmarks() {
    let recentBookmarksArr = []
    chrome.bookmarks.getRecent(rbCount, (recents) => {
        recentBookmarksArr = recents.map((el) => {
            return new RB(el)
        })
        render("recent-bookmarks-box", recentBookmarksArr)
        addListenerForRB()
    })
}


/*
// This method needs to be called after rendering the DOM
// to add the event listeners required for recent-bookmarks section
*/
function addListenerForRB() {
    // Add event listener to open links in header
    for (let el of document.getElementsByClassName('recent-bookmarks')) {
        el.addEventListener("click", (event) => {
            console.log(event)
            openLink(event.target.id)
        })
    }
}