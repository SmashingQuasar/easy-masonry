"use strict";
window.addEventListener("load", () => {
    let wrapper = document.querySelector("main");
    if (wrapper instanceof HTMLElement) {
        let masonry = new EasyMasonry(wrapper, 3);
        console.log(masonry);
    }
    else if (wrapper !== null) {
        console.log(wrapper.constructor.name);
    }
    else {
        console.log("EM: Wrapper does not exist.");
    }
});
