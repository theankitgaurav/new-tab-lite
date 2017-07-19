let topSitesArr = [] // Contains all the topsite objects synced from chrome.topsites api
let recentBookmarksArr = [] // Contains all the recently bookmarked objects synced from chrome.bookmarks.getRecent api
let speedDialsArr = [] // Contains all the data objects for 
const sdCount = 10
const rbCount = 8
const key = 'removed-speed-dials'
/* 
This class creates the required DOM elements to be embedded in the 
speed-dial-box
*/
class SD {
    constructor(SDObject) {
        this.url = SDObject.url || '#'
        this.title = SDObject.title || ''
        this.shortTitle = (SDObject.title.length <= 6) ? SDObject.title : SDObject.title.substring(0, 10) + '..'
        this.faviconUrl = `chrome://favicon/${SDObject.url}`
    }
    toString() {
        return `
        <div class="speed-dial">
            <div class="speed-dial-item">
                <span class="remove">x</span>
                <img class="speed-dial-favicon" src="${this.faviconUrl}" width=20px height=20px>
                <div class="speed-dial-title" title="${this.title}" id="${this.url}">${this.title}</div>
            </div>
        </div>`
    }
}
/* 
This class creates the required DOM elements to be embedded in the 
header section as recently bookmarked urls
*/
class RB {
    constructor(RBObject) {
        this.id = RBObject.id
        this.url = RBObject.url || '#'
        this.title = RBObject.title || ''
        this.shortTitle = (RBObject.title.length < 15) ? RBObject.title : RBObject.title.substring(0, 15) + '..'
        this.favicon = `chrome://favicon/${RBObject.url}`
    }
    toString() {
        return `
        <div class="recent-bookmarks" title="${this.title}
${this.url}"  id="${this.url}">
        <img class="favicon" src="${this.favicon}">
        ${this.shortTitle}
        </div>`
    }
}


/* 
Helper method to open chrome-specific and regular urls bypassing content
security policy
@param url: string: the url to be opened
@param self: boolean: whether or not to open in the same tab
*/
function openLink() {
    chrome.tabs.update({
        'url': arguments[0],
        'selected': (arguments[1]) ? arguments[1] : true
    })
}

/*
helper method to append the dom elements to a given parent div
@param parentDivId: string: id of parent div where child nodes are to be 
appended 
@param dataObjectsArr: Array: list of all the data objects with toString method 
for generating the dom html string
*/
function render(parentDivId, dataObjectsArr) {
    const parentDiv = document.getElementById(parentDivId)
    for (let el of dataObjectsArr) {
        parentDiv.innerHTML += el.toString()
    }
}


/* Todo: 
This method removes a particular url from the speed dial and also saves it into
chrome storage.
The removed urls can be brought back by resetting prefereces from settings.
*/
function removeSD(url) {
    chrome.storage.sync.get(key, function(result) {
        if (Object.keys(result).length === 0 && result.constructor === Object) {
            set(key, [url])
        } else {
            set(key, result.push(url))
        }
    })
}


/*
This method resets the chrome storage and deletes user preferences viz. Removed
speed-dials
*/
function reset(option) {
    set(option, {})
}


// Helper method to sync data to chrome storage api
function set(key, value) {
    chrome.storage.sync.set({ key: value }, function() {
        if (chrome.runtime.lastError) {
            throw ('Runtime lastError while saving data to chrome storage')
        } else {
            console.log('User data synced successfully')
        }
    })
}


// Helper method to retrieve saved user data from chrome storage api
function get(key) {
    chrome.storage.sync.get(key, function(result) {
        if (Object.keys(result).length === 0 && result.constructor === Object) {
            return new Set()
        } else {
            console.log('result: ', result)
            return result
        }
    })
}


/*
Todo:

*/
chrome.bookmarks.getRecent(rbCount, (recents) => {
    recentBookmarksArr = recents.map((el) => {
        return new RB(el)
    })
    render("recent-bookmarks-box", recentBookmarksArr)
    addListenerForRB()
})

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

/*
Todo:
*/
chrome.topSites.get((sites) => {
    // let removedItems = get('removed-speed-dials')
    chrome.storage.sync.get('removed-speed-dials', function(result) {
        if (result.hasOwnProperty('length')) {
            speedDialsArr = sites.filter((el) => {
                return result.indexOf(el.url) === -1
            })
        } else {
            speedDialsArr = sites
        }
        speedDialsArr = speedDialsArr.map((el) => {
            return new SD(el)
        })
        speedDialsArr = speedDialsArr.splice(0, sdCount)
        render("speed-dial-box", speedDialsArr)
        addListenersForSD()

    })

})

/*
// This method needs to be called after rendering the DOM
// to add the event listeners required for speed-dials section
*/
function addListenersForSD() {
    // Add event listener to open links from the speed dials
    for (let el of document.getElementsByClassName('speed-dial')) {
        el.addEventListener("click", (event) => {
            openLink(event.target.firstChild.id)
        })
    }
    // Add event listener to remove particular items from speed dial box and storage 
    for (let el of document.getElementsByClassName("remove")) {
        el.addEventListener("click", (event) => {
            event.cancelBubble = true // Prevents the event from being bubbled into parent divs
            const speedDial = event.target.parentNode
            const parentDiv = speedDial.parentNode
            parentDiv.removeChild(speedDial)
            removeSD(speedDial.firstChild.id) // Updates the removal into storage
        })
    }
}
// Add click event listeners to footer launchButtons
for (let el of document.getElementsByClassName("launchButton")) {
    el.addEventListener("click", (event) => {
        openLink(event.target.getAttribute("data-url"))
    })
}