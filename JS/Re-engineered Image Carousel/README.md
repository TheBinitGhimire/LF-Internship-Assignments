# bCarousel - An image slider library
### Version: `v0.0.2` (Codename: `Second Assignment`)
### Author: Binit Ghimire (https://github.com/thebinitghimire)

## Usage
Just create a parent element with the class "bCarousel", and place your images under the IMG tag inside this element! You can create multiple slider elements in the same way.

Easily define hold times, transition times, background colors and slider container width with HTML5 datasets (data-* attributes)!

* Hold Times (in seconds): **`data-interval=""`** (default: 5)
* Transition Times (in seconds): **`data-transition=""`** (default: 2)
* Background Colors (all formats supported): **`data-background=""`** (default: inherit from parent)
* Slider Container Width (any units supported): **`data-width=""`** (default: 100%)

*Note that these attributes are completely optional; for default values, see above list!*

### Sample Usage Demonstration

```html
<!-- Include the required stylesheet of the library (./css/style.css) -->
<div class="bCarousel" data-interval="2" data-transition="1" data-background="#AA076B" data-width="48%"> <!-- Making use of all configurable options! -->
    <img src="images/1.jpg" alt="Image 1" />
    <img src="images/2.jpg" alt="Image 2" />
    <!-- Include as many images as you want! -->
</div>

<div class="bCarousel" data-background="#072540" data-width="48%"> <!-- You can do this as well! -->
    <img src="images/1.jpg" alt="Image 1" />
    <img src="images/2.jpg" alt="Image 2" />
    <img src="images/3.jpg" alt="Image 3" />
    <img src="images/4.jpg" alt="Image 4" />
    <img src="images/5.jpg" alt="Image 5" />
    <img src="images/6.jpg" alt="Image 6" />
    <!-- Include as many images as you want! -->
</div>

<div class="bCarousel"> <!-- This is also supported! -->
    <img src="images/1.jpg" alt="Image 1" />
    <img src="images/2.jpg" alt="Image 2" />
    <img src="images/3.jpg" alt="Image 3" />
    <img src="images/4.jpg" alt="Image 4" />
    <!-- Include as many images as you want! -->
</div>
<!-- Include the required JavaScript file of the library (./js/bCarousel.js) -->
```

The **Live Demonstration** is [**available here**](https://whoisbinit.me/LF-Internship-Assignments/JS/Re-engineered%20Image%20Carousel/).

## New Features (after v0.0.1; i.e. `First Assignment`)
* Automated image sliding with a fixed, configurable time interval (hold times),
* Configurable transition timings,
* Ability to use multiple instances of the slider in a single webpage!

## Features
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