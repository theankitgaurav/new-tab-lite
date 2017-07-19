/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = openLink;
/* harmony export (immutable) */ __webpack_exports__["b"] = render;
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
    parentDiv.innerHTML = ""
    for (let el of dataObjectsArr) {
        parentDiv.innerHTML += el.toString()
    }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

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
            <div class="speed-dial-item" id="${this.url}">
                <span class="remove">x</span>
                <img class="speed-dial-favicon" src="${this.faviconUrl}" width=20px height=20px>
                <div class="speed-dial-title" title="${this.title}">${this.title}</div>
            </div>
        </div>`
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = SD;

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
/* harmony export (immutable) */ __webpack_exports__["a"] = RB;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recent_bookmarks__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__speed_dials__ = __webpack_require__(4);




const totolSpeedDials = 10
const totalRecentBookmarks = 8

// Disable the default context manus
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
}, false)

// Add click event listeners to footer launchButtons
for (let el of document.getElementsByClassName("launchButton")) {
    el.addEventListener("click", (event) => {
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* openLink */])(event.target.getAttribute("data-url"))
    })
}

Object(__WEBPACK_IMPORTED_MODULE_2__speed_dials__["a" /* fetchTopSites */])(totolSpeedDials)
Object(__WEBPACK_IMPORTED_MODULE_1__recent_bookmarks__["a" /* fetchRecentBookmarks */])(totalRecentBookmarks)

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchRecentBookmarks;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes__ = __webpack_require__(1);



function fetchRecentBookmarks(rbCount) {
    let recentBookmarksArr = []
    chrome.bookmarks.getRecent(rbCount, (recents) => {
        recentBookmarksArr = recents.map((el) => {
            return new __WEBPACK_IMPORTED_MODULE_1__classes__["a" /* RB */](el)
        })
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* render */])("recent-bookmarks-box", recentBookmarksArr)
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
            Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* openLink */])(event.target.id)
        })
    }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchTopSites;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes__ = __webpack_require__(1);



let sdUrls = []
let sdDomObjects = []
const key = 'removed-speed-dials'

/*
Todo:
*/
function fetchTopSites(sdCount) {
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
                return new __WEBPACK_IMPORTED_MODULE_1__classes__["b" /* SD */](el)
            }).splice(0, sdCount)
            Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* render */])("speed-dial-box", sdDomObjects)
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
            Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* openLink */])(event.target.id)
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


/***/ })
/******/ ]);