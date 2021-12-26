/*
    bCarousel - An image slider library
    Version: v0.0.1 (Codename: First Assignment)
    Author: Binit Ghimire (https://github.com/thebinitghimire)

    -> Usage:
    Just create a parent element with the id "bCarousel", and place your images under the IMG tag inside this element!

    -> Features:
    * Multiple ways to switch images:
        - Using "previous" or "next" arrows,
        - Using the indicator dots at the bottom for navigation,
        - Swiping left or right in touch-enabled devices,
        - Using "left" or "right" arrow keys on the keyboard!
    * Dynamic indicator dots count (ranging from 1 to 5, maximum 5)!
    * Circular Queue-like Image Sliding!
    * Ability to set a custom slider width!
    * Indicator Dots allowing click events for circular navigation with proper transitioning, with the central dot representing the current Image!
    * Sliding animation from left-to-right or right-to-left!
    
    -> Further Improvements for v0.0.2:
    * Automating image sliding with a fixed configurable time interval,
    * Ability to use multiple instances of the slider in a single webpage,
    * Configurable timings for different purposes!
*/

let container = document.getElementById("bCarousel");
let images = container.getElementsByTagName("img");

container.style.width = "80%";

// Initializing the carousel!
for (let i = 0; i < images.length; i++) {
    images[i].setAttribute("data-id", i);
    images[i].style.display = "none";
}
images[0].style.display = "block";

let previous = document.createElement("span");
previous.className = "bElements previous";
previous.innerHTML = "◄";
container.appendChild(previous);
previous.setAttribute("data-previous", images.length - 1);

if (images.length > 0) current = 0;
else current = null;

let next = document.createElement("span");
next.className = "bElements next";
next.innerHTML = "►";
container.appendChild(next);
if (images.length > 1) next.setAttribute("data-next", 1);
else next.setAttribute("data-next", 0);

/* Adding dots for indication and navigation! */
let indicators = document.createElement("span");
indicators.className = "bElements indicator";

function createIndicator(n) {
    for (i = 0; i < n; i++) {
        iE = document.createElement("span");
        iE.setAttribute("data-active", "0");
        iE.innerHTML = "◉";
        indicators.appendChild(iE);
    }
}

if (images.length == 1) createIndicator(1);
else if (images.length == 2) createIndicator(2);
else if (images.length == 3) createIndicator(3);
else if (images.length == 4) createIndicator(4);
else createIndicator(5);

container.appendChild(indicators);
let iEs = indicators.getElementsByTagName("span");
totaliE = iEs.length;
let middle = Math.floor((totaliE - 1) / 2);
iEs[middle].setAttribute("data-active", "1");

function rewindIndicators() {
    for (i = 0; i < totaliE; i++) {
        if (i == middle) iEs[i].setAttribute("data-id", current);
        else if (i < middle) {
            iEs[i].setAttribute("data-id", (images.length + parseInt(current) - (middle - i)) % images.length);
        } else {
            iEs[i].setAttribute("data-id", (images.length + parseInt(current) + (i - middle)) % images.length);
        }
    }
}
rewindIndicators();

function switchImage(upcoming) {
    let currentElement = document.querySelector('[data-id="' + current + '"]');
    let upcomingElement = document.querySelector('[data-id="' + upcoming + '"]');
    upcomingElement.style.display = "block";
    if (current < upcoming) { // next element
        upcomingElement.animate([
            { transform: 'translateX(' + container.style.width + ')' },
            { transform: 'translateX(0px)' },
        ], {
            duration: 500,
            iterations: 1
        })
    } else { // previous element
        upcomingElement.animate([
            { transform: 'translateX(-' + container.style.width + ')' },
            { transform: 'translateX(0px)' },
        ], {
            duration: 500,
            iterations: 1
        })
    }
    currentElement.style.display = "none";
    previous.setAttribute("data-previous", (images.length + parseInt(upcoming) - 1) % images.length);
    next.setAttribute("data-next", (images.length + parseInt(upcoming) + 1) % images.length);
    current = upcoming;
    rewindIndicators();
}

previous.addEventListener("click", function (e) {
    upcoming = previous.getAttribute("data-previous");
    switchImage(upcoming);
})

next.addEventListener("click", function (e) {
    upcoming = next.getAttribute("data-next");
    switchImage(upcoming);
})

for (i = 0; i < totaliE; i++) {
    if (i != middle) {
        iEs[i].addEventListener("click", function (e) {
            upcoming = e.target.getAttribute("data-id");
            switchImage(upcoming);
        })
    }
}

/* Alternative ways to switch images! */

/* For Touch-enabled Devices */
let touchStart = 0, touchEnd = 0;
container.addEventListener("touchstart", function (e) {
    touchStart = e.changedTouches[0].screenX;
})
container.addEventListener("touchend", function (e) {
    touchEnd = e.changedTouches[0].screenX;
    if (touchEnd < touchStart) previous.click();
    else if (touchEnd > touchStart) next.click();
})

/* For Arrow KeyPress */
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowLeft":
            previous.click();
            break;
        case "ArrowRight":
            next.click();
            break;
    }
})