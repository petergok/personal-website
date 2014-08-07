var tabLinks = new Array();
var contentDivs = new Array();
var detailsList = new Array();
var devTopsList = new Array();

function init() {

    // Grab the tab links and content divs from the page
    var tabListItems = document.getElementById('tabs').childNodes;
    for (var i = 0; i < tabListItems.length; i++) {
        if (tabListItems[i].nodeName == "LI") {
            var tabLink = getFirstChildWithTagName(tabListItems[i], 'A');
            var id = getHash(tabLink.getAttribute('href'));
            tabLinks[id] = tabLink;
            contentDivs[id] = document.getElementById(id);
        }
    }

    tabListItems = document.getElementById('text-links').childNodes;
    for (var i = 0; i < tabListItems.length; i++) {
        if (tabListItems[i].nodeName == "LI" && tabListItems[i].id != "separator") {
            var tabLink = getFirstChildWithTagName(tabListItems[i], 'A');
            var id = getHash(tabLink.getAttribute('href'));
            tabLink.onclick = clickTab;
        }
    }

    // Assign onclick events to the tab links, and
    // highlight the first tab
    var i = 0;
    var avoid = undefined;
    if (document.URL.indexOf("#") >= 0) {
        var avoid = document.URL.substring(document.URL.indexOf("#") + 1);
    }

    if (!avoid || avoid == 'home') {
        document.getElementById('navbar').style.minWidth = 1400 + 'px';
    } else {
        document.getElementById('navbar').style.minWidth = 1480 + 'px';
    }

    if (!avoid || avoid == 'home' || avoid == 'developer') {
        document.getElementsByTagName('html')[0].classList.remove('extend-to-bottom');
    } else {
        document.getElementsByTagName('html')[0].classList.add('extend-to-bottom');
    }

    for ( var id in tabLinks ) {
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() { this.blur() };
        if (avoid) {
            if (id == avoid) {
                tabLinks[id].className = 'selected';
            }
        } else if (i == 0) {
            tabLinks[id].className = 'selected';
        }
        i++;
    }
     
    // Hide all content divs except the first
    var i = 0;

    for ( var id in contentDivs ) {
        if (avoid) {
            if (id != avoid) {
                contentDivs[id].className = 'tabContent hide';
            } else {
                contentDivs[id].className = 'tabContent';
            }
        } else if ( i != 0 ) {
            contentDivs[id].className = 'tabContent hide';
        } else {
            contentDivs[id].className = 'tabContent';
        }
        i++;
    }

    initDeveloperPage();
};

function initDeveloperPage() {
    var buttons = document.getElementsByClassName('details-button');
    var details = document.getElementsByClassName('details');
    var devTops = document.getElementsByClassName('dev-top');
    for (var i = 0; i < buttons.length; i++) {
        var name = buttons[i].getAttribute('data-name');
        buttons[i].onclick = toggleDetails;
        detailsList[name] = details[i];
        devTopsList[name] = devTops[i];
    }
};

function toggleDetails() {
    var id = this.getAttribute('data-name');
    var devtop = devTopsList[id];
    var details = detailsList[id];
    var devtopExtended = devtop.classList.contains('stretch')
    if (devtopExtended) {
        setTimeout(function() {setDisplay(details, true)}, 125);
        details.classList.remove('fade-in');
        details.classList.add('fade-out');
        devtop.classList.remove('stretch');
        devtop.classList.add('shrink');
        this.innerHTML = "Show Details";
    } else {
        setTimeout(function() {setDisplay(details, false)}, 450);
        setTimeout(function() {showDetails(details)}, 500);
        devtop.classList.remove('shrink');
        devtop.classList.add('stretch');
        this.innerHTML = "Hide Details";
    }

    return false;
};

function setDisplay(details, hide) {
    if (hide) {
        details.style.display = 'none';
    } else {
        details.style.display = 'block';
    }
}

function showDetails(details) {
    details.classList.remove('fade-out');
    details.classList.add('fade-in');
};

function clickTab() {
    var id = getHash(this.getAttribute('href'));

    tabLinks[id].onfocus();
    tabLinks[id].click();

    return false;
};

function showTab() {
    var selectedId = getHash(this.getAttribute('href'));

    if (selectedId == 'home') {
        document.getElementById('navbar').style.minWidth = 1400 + 'px';
    } else {
        document.getElementById('navbar').style.minWidth = 1480 + 'px';
    }

    if (selectedId == 'home' || selectedId == 'developer') {
        document.getElementsByTagName('html')[0].classList.remove('extend-to-bottom');
    } else {
        document.getElementsByTagName('html')[0].classList.add('extend-to-bottom');
    }

    // Highlight the selected tab, and dim all others.
    // Also show the selected content div, and hide all others.
    for (var id in contentDivs) {
        if (id == selectedId) {
            tabLinks[id].className = 'selected';
            contentDivs[id].className = 'tabContent';
        } else {
            tabLinks[id].className = '';
            contentDivs[id].className = 'tabContent hide';
        }
    }

    return false;
};

function getFirstChildWithTagName(element, tagName) {
    for (var i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].nodeName == tagName) return element.childNodes[i];
    }
};

function getHash(url) {
    var hashPos = url.lastIndexOf('#');
    return url.substring(hashPos + 1);
};