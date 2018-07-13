"use strict";
var EasyMasonry = /** @class */ (function () {
    function EasyMasonry(wrapper) {
        this.wrapper = wrapper;
        this.baseImages = this.wrapper.querySelectorAll("img");
    }
    EasyMasonry.prototype.initialize = function () {
        console.log(this.baseImages, this.baseImages.length);
        Array.prototype.forEach.call(this.baseImages, function (baseImage) {
            console.log(baseImage, baseImage.offsetWidth);
        });
    };
    return EasyMasonry;
}());
window.addEventListener("load", function () {
    var masonry = new EasyMasonry(document.querySelector("easy-masonry"));
    masonry.initialize();
    console.log("test");
});
