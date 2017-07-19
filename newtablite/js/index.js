import { openLink } from './helpers'
import { fetchRecentBookmarks } from './recent-bookmarks'
import { fetchTopSites } from './speed-dials'

const totolSpeedDials = 10
const totalRecentBookmarks = 8

// Disable the default context manus
document.addEventListener("contextmenu", (event) => {
    event.preventDefault()
}, false)

// Add click event listeners to footer launchButtons
for (let el of document.getElementsByClassName("launchButton")) {
    el.addEventListener("click", (event) => {
        openLink(event.target.getAttribute("data-url"))
    })
}

fetchTopSites(totolSpeedDials)
fetchRecentBookmarks(totalRecentBookmarks)