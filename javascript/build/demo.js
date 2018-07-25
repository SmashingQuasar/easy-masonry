"use strict";
function debounce_event(target, event_name, delay) {
    delay = (delay || 300);
    var id = 0;
    function completed() {
        target.dispatchEvent(new CustomEvent("debounced_" + event_name, {
            bubbles: true,
            cancelable: true
        }));
    }
    target.addEventListener(event_name, function () {
        clearTimeout(id);
        id = setTimeout(completed, delay);
    });
}
window.addEventListener("load", function () {
    var wrapper = document.querySelector("main");
    var masonry;
    var columns = 2;
    if (document.body.offsetWidth < 1140) {
        columns = 2;
    }
    else {
        columns = 3;
    }
    if (wrapper instanceof HTMLElement) {
        masonry = new EasyMasonry(wrapper, columns);
        console.log(masonry);
    }
    else if (wrapper !== null) {
        console.log(wrapper.constructor.name);
    }
    else {
        console.log("EasyMasonry: Wrapper does not exist.");
    }
    debounce_event(window, "resize", 300);
    window.addEventListener("debounced_resize", function () {
        if (document.body.offsetWidth < 1140) {
            masonry.paint(2);
        }
        else {
            masonry.paint(3);
        }
    });
});
