import { openLink, render } from './helpers'
import { RB } from './classes'
const rbCount = 8

export function fetchRecentBookmarks() {
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
    for (let el of document.getElementsByClassName('recent-bookmarks')) {
        el.addEventListener("click", (event) => {
            openLink(event.target.id)
        })
    }
}