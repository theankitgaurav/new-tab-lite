/* 
Helper method to open chrome-specific and regular urls bypassing content
security policy
@param url: string: the url to be opened
@param self: boolean: whether or not to open in the same tab
*/
export function openLink() {
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
export function render(parentDivId, dataObjectsArr) {
    const parentDiv = document.getElementById(parentDivId)
    parentDiv.innerHTML = ""
    for (let el of dataObjectsArr) {
        parentDiv.innerHTML += el.toString()
    }
}

export function get(key) {
	return JSON.parse(localStorage.getItem(key))
}

export function set(key, value) {
	localStorage.setItem(key, JSON.stringify(value)) 
}