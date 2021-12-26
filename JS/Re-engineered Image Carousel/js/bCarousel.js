/*
    bCarousel - An image slider library
    Version: v0.0.2 (Codename: Second Assignment)
    Author: Binit Ghimire (https://github.com/thebinitghimire)

    -> Usage:
    Just create a parent element with the class "bCarousel", and place your images under the IMG tag inside this element! You can create multiple slider elements in the same way.

    Easily define hold times, transition times, background colors and slider container width with HTML5 datasets (data-* attributes)!
    * Hold Times (in seconds): data-interval="" (default: 5)
    * Transition Times (in seconds): data-transition="" (default: 2)
    * Background Colors (all formats supported): data-background="" (default: inherit from parent)
    * Slider Container Width (any units supported): data-width="" (default: 100%)
    
    Note that these attributes are completely optional; for default values, see above list!
    
    -> New Features:
    * Automated image sliding with a fixed, configurable time interval (hold times),
    * Configurable transition timings,
    * Ability to use multiple instances of the slider in a single webpage!

    -> Features:
    * Multiple ways to switch images:
        - Using "previous" or "next" arrows,
        - Using the indicator dots at the bottom for navigation,
        - Swiping left or right in touch-enabled devices,
        - Using "left" or "right" arrow keys on the keyboard (this way enables you to switch images of all sliders at once)!
    * Dynamic indicator dots count (ranging from 1 to 5, maximum 5)!
    * Circular Queue-like Image Sliding!
    * Ability to set a custom slider width!
    * Indicator Dots allowing click events for circular navigation with proper transitioning, with the central dot representing the current Image!
    * Sliding animation from left-to-right or right-to-left!
*/

let bCarousel = function(position, autoInterval, transitionTime, backgroundColor, containerWidth){
    this.position = position;
    this.autoInterval = autoInterval;
    this.transitionTime = transitionTime;
    this.backgroundColor = backgroundColor;
    this.containerWidth = containerWidth;

    var element = document.querySelector('[data-element="'+this.position+'"]');
    this.elementHeight = element.clientHeight;
    element.style.maxHeight = this.elementHeight;

    var images = element.getElementsByTagName("img");

    if(this.backgroundColor!=0) element.style.backgroundColor = this.backgroundColor;
    element.style.width = this.containerWidth;

    // Initializing the carousel!
    for (i = 0; i < images.length; i++) {
        images[i].setAttribute("data-id", i);
        images[i].style.display = "none";
    }
    images[0].style.display = "block";

    var previous = document.createElement("span");
    previous.className = "bElements previous";
    previous.innerHTML = "◄";
    element.appendChild(previous);
    previous.setAttribute("data-previous", images.length - 1);

    if (images.length > 0) current = 0;
    else current = null;

    var next = document.createElement("span");
    next.className = "bElements next";
    next.innerHTML = "►";
    element.appendChild(next);
    if (images.length > 1) next.setAttribute("data-next", 1);
    else next.setAttribute("data-next", 0);

    /* Adding dots for indication and navigation! */
    var indicators = document.createElement("span");
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

    element.appendChild(indicators);
    var iEs = indicators.getElementsByTagName("span");
    totaliE = iEs.length;
    var middle = Math.floor((totaliE - 1) / 2);
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

    var switchImage = function (upcoming) {
        var currentElement = element.querySelector('[data-id="' + current + '"]');
        var upcomingElement = element.querySelector('[data-id="' + upcoming + '"]');
        console.log(currentElement)
        for(i=0;i<images.length;i++){
            if(i==upcoming) images[i].style.display = "block";
            else images[i].style.display = "none";
        }
        if (current < upcoming) { // next element
            upcomingElement.animate([
                { transform: 'translateX(' + element.style.width + ')' },
                { transform: 'translateX(0px)' },
            ], {
                duration: transitionTime,
                iterations: 1
            })
        } else { // previous element
            upcomingElement.animate([
                { transform: 'translateX(-' + element.style.width + ')' },
                { transform: 'translateX(0px)' },
            ], {
                duration: transitionTime,
                iterations: 1
            })
        }
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

    /* Automated Image Sliding */
    setInterval(function(){
        next.click();
    }, this.autoInterval);

    /* Alternative ways to switch images! */

    /* For Touch-enabled Devices */
    var touchStart = 0, touchEnd = 0;
    element.addEventListener("touchstart", function (e) {
        touchStart = e.changedTouches[0].screenX;
    })
    element.addEventListener("touchend", function (e) {
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
}

let userContainers = document.getElementsByClassName("bCarousel");
for(let i=0;i<userContainers.length;i++){
    let autoInterval = isNaN(parseInt(userContainers[i].dataset.interval))?5000:(parseInt(userContainers[i].dataset.interval)*1000);
    let transitionTime = isNaN(parseInt(userContainers[i].dataset.transition))?2000:(parseInt(userContainers[i].dataset.transition)*1000);
    
    let backgroundColor = userContainers[i].dataset.background?userContainers[i].dataset.background:0;    
    let containerWidth = userContainers[i].dataset.width?userContainers[i].dataset.width:"100%";

    userContainers[i].setAttribute("data-element", i);
    new bCarousel(i, autoInterval, transitionTime, backgroundColor, containerWidth);
}