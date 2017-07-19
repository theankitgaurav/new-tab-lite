import { openLink, render } from './helpers'
import { SD } from './classes'

let sdUrls = []
let sdDomObjects = []
const key = 'removed-speed-dials'

/*
Todo:
*/
export function fetchTopSites(sdCount) {
    chrome.topSites.get((sites) => {
        chrome.storage.sync.get(key, function(removedItems) {
            console.log(removedItems)
            if (chrome.runtime.lastError) {
                console.error("Runtime Error while fetching data from Chrome Storage")
                sdUrls = sites
            } else if (removedItems.key == null) {
                //console.log('No urls removed from Speed Dial')
                sdUrls = sites
            } else {
                sdUrls = sites.filter((el) => {
                    return removedItems.indexOf(el.url) === -1
                })
            }
            sdDomObjects = sdUrls.map((el) => {
                return new SD(el)
            }).splice(0, sdCount)
            render("speed-dial-box", sdDomObjects)
            addListenersForSD()
        })
    })
}


/*
// This method needs to be called after rendering the DOM
// to add the event listeners required for speed-dials section
*/
function addListenersForSD() {
    // Add event listener to open links from the speed dials
    for (let el of document.getElementsByClassName('speed-dial')) {
        el.addEventListener("click", (event) => {
            openLink(event.target.id)
        })
    }
    // Add event listener to remove particular items from speed dial box and storage 
    for (let el of document.getElementsByClassName("remove")) {
        el.addEventListener("click", (event) => {
            event.cancelBubble = true // Prevents the event from being bubbled into parent divs
            const speedDial = event.target.parentNode.parentNode
            const parentDiv = speedDial.parentNode
            let urlToBeRemoved = speedDial.firstChild.id
            chrome.storage.sync.get(key, (res) => {
                if (chrome.runtime.lastError) {
                    console.error("Runtime Error while fetching data from Chrome Storage")
                } else if (res.key == null) {// No urls saved to be removed from Speed Dial
                    res.key = [urlToBeRemoved]
                    chrome.storage.sync.set({ key: res }, () => {
                        console.log('New url saved to be removed from speed dial')
                    })
                } else {
                    console.log('savedRemovedUrls: ', res)
                    if (res.key.indexOf(urlToBeRemoved) === -1) { //url doesn't exist in storage
                        res.key.push(urlToBeRemoved)
                        chrome.storage.sync.set({ key: res }, () => {
                            console.log('New url saved to be removed from speed dial')
                        })
                    } else {
                        console.log('Url already exists in removedUrls chrome storage')
                    }
                }
                fetchTopSites()
            })

        })
    }
}
