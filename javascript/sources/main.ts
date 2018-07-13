"use strict";

class EasyMasonry
{
    private baseImages: NodeList;
    private wrapper: HTMLElement;
    
    constructor(wrapper: HTMLElement)
    {
        this.wrapper = wrapper;
        this.baseImages = this.wrapper.querySelectorAll("img");
    }

    initialize()
    {
        console.log(this.baseImages, this.baseImages.length);

        Array.prototype.forEach.call(
            this.baseImages,
            (baseImage: HTMLImageElement) => {
                console.log(baseImage, baseImage.offsetWidth);
            }
        );

    }
}
window.addEventListener(
    "load",
    () => {
        let masonry = new EasyMasonry(document.querySelector("easy-masonry"));
        masonry.initialize();
        console.log("test");
    }
);
