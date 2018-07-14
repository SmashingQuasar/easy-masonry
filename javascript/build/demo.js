"use strict";
window.addEventListener("load", function () {
    var wrapper = document.querySelector("easy-masonry");
    if (wrapper instanceof HTMLElement) {
        var masonry = new EasyMasonry(wrapper, 4);
        console.log(masonry);
    }
    else if (wrapper !== null) {
        console.log(wrapper.constructor.name);
    }
    else {
        console.log("EM: Wrapper does not exist.");
    }
});
