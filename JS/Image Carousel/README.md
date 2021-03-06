# bCarousel - An image slider library
### Version: `v0.0.1` (Codename: `First Assignment`)
### Author: Binit Ghimire (https://github.com/thebinitghimire)

## Usage
Just create a parent element with the id "bCarousel", and place your images under the IMG tag inside this element!

### Sample Usage Demonstration

```html
<!-- Include the required stylesheet of the library (./css/style.css)-->
<div id="bCarousel">
    <img src="images/1.jpg" alt="Image 1" />
    <img src="images/2.jpg" alt="Image 2" />
    <!-- Include as many images as you want! -->
</div>
<!-- Include the required JavaScript file of the library (./js/bCarousel.js) -->
```

The **Live Demonstration** is [**available here**](https://whoisbinit.me/LF-Internship-Assignments/JS/Image%20Carousel/).

## Features
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

## Further Improvements for v0.0.2:
* Automating image sliding with a fixed configurable time interval,
* Ability to use multiple instances of the slider in a single webpage,
* Configurable timings for different purposes!