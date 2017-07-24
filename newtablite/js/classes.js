
/* 
This class creates the required DOM elements to be embedded in the 
speed-dial-box
*/
export class SD {
    constructor(SDObject) {
        this.url = SDObject.url || '#'
        this.title = SDObject.title || ''
        this.shortTitle = (SDObject.title.length <= 6) ? SDObject.title : SDObject.title.substring(0, 10) + '..'
        this.faviconUrl = `chrome://favicon/${SDObject.url}`
    }
    toString() {
        return `
        <div class="speed-dial">
            <div class="speed-dial-item" data-id="${this.url}">
                <span class="remove" title="Remove">x</span>
                <img data-id="${this.url}" class="speed-dial-favicon" src="${this.faviconUrl}" width=20px height=20px>
                <div data-id="${this.url}" class="speed-dial-title" title="${this.title}">${this.title}</div>
            </div>
        </div>`
    }
}
/* 
This class creates the required DOM elements to be embedded in the 
header section as recently bookmarked urls
*/
export class RB {
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
        ${this.title}
        </div>`
    }
}