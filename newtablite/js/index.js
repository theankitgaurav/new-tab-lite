import { openLink } from './helpers'
import { fetchRecentBookmarks } from './recent-bookmarks'
import { fetchTopSites } from './speed-dials'

if ( document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll) ) {
    initialize();
} else {
    document.addEventListener("DOMContentLoaded", initialize);
}


function initialize () {
    // Disable the default context menus
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault()
    }, false)

    // Add click event listeners to footer launchButtons
    for (let el of document.getElementsByClassName("launchButton")) {
        el.addEventListener("click", (event) => {
            openLink(event.target.getAttribute("data-url"))
        })
    }

    fetchTopSites()
    fetchRecentBookmarks()
}
