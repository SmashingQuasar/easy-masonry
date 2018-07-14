"use strict";
window.addEventListener(
    "load",
    () =>
    {
        let wrapper: HTMLElement | null = document.querySelector("easy-masonry");

        if (wrapper instanceof HTMLElement)
        {
            let masonry = new EasyMasonry(wrapper, 4);
            console.log(masonry);
        }
        else if (wrapper !== null)
        {
            console.log((<any>wrapper).constructor.name);
        }
        else
        {
            console.log("EM: Wrapper does not exist.");
        }

    }
);