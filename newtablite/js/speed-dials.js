import { openLink, render, get, set } from './helpers'
import { SD } from './classes'

let sdUrls = []
let sdDomObjects = []
const key = 'removedSDURLs'
let removedURLs = []
let sdCount = 10

export function fetchTopSites() {
    removedURLs = get(key)
    chrome.topSites.get((sites) => {
        if (removedURLs == null) {
            sdUrls = sites
        } else {
            sdUrls = sites.filter((el) => {
                return removedURLs.indexOf(el.url) === -1
            })
        }
        sdDomObjects = sdUrls.map((el) => {
            return new SD(el)
        }).slice(0,sdCount)
        render("speed-dial-box", sdDomObjects)
        addListenersForSD()
        addListenersForRemoveButtons()
    })
}


function addListenersForSD() {
    // Add event listener to open links from the speed dials
    for (let el of document.getElementsByClassName('speed-dial')) {
        el.addEventListener("click", (event) => {
            openLink(event.target.id)
        })
    }
}

function addListenersForRemoveButtons() {
    // Add event listener to remove particular items from speed dial box and storage 
    for (let el of document.getElementsByClassName("remove")) {
        el.addEventListener("click", (event) => {
            console.log(event)
            // Prevents the event from being bubbled into parent divs
            event.cancelBubble = true

            const clickedSDDiv = event.target.parentNode.parentNode
            const urlToBeRemoved = clickedSDDiv.firstElementChild.id

            if (removedURLs == null) { // No urls saved to be removed from Speed Dial
                removedURLs = [urlToBeRemoved]
                set(key, removedURLs)
            } else { // Some urls already being ignored from speed dial
                if (removedURLs.indexOf(urlToBeRemoved) === -1) { //url doesn't exist in storage
                    removedURLs.push(urlToBeRemoved)
                    set(key, removedURLs)
                } else {
                    console.log('Url already exists in removedURLs chrome storage')
                }
            }
            fetchTopSites()
        })
    }
}