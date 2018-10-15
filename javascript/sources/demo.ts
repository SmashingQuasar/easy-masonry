"use strict";

function debounce_event(target: any, event_name: string, delay: number)
{
	delay = (delay || 300);

	let id: number = 0;

	function completed(): void
	{
		target.dispatchEvent(
			new CustomEvent(
				"debounced_" + event_name,
				{
					bubbles : true,
					cancelable : true
				}
			)
		);
	}

	target.addEventListener(
		event_name,
		function (): void
		{
			clearTimeout(id);
			id = setTimeout(completed, delay);
		}
	);
}
let masonry: EasyMasonry | undefined = undefined;

window.addEventListener(
    "load",
    () =>
    {
        let wrapper: HTMLElement | null = document.querySelector("main");

        let columns = 2;

        if (document.body.offsetWidth < 1140)
        {
            columns = 2;
        }
        else
        {
            columns = 3;
        }

        if (wrapper instanceof HTMLElement)
        {
            masonry = new EasyMasonry(wrapper, columns);
            console.log(masonry);
        }
        else if (wrapper !== null)
        {
            console.log((<any>wrapper).constructor.name);
        }
        else
        {
            console.log("EasyMasonry: Wrapper does not exist.");
        }

        debounce_event(window, "resize", 300);

        window.addEventListener(
            "debounced_resize",
            () =>
            {
                if (masonry !== undefined)
                {
                    if (document.body.offsetWidth < 1140)
                    {
                        masonry.paint(2);
                    }
                    else
                    {
                        masonry.paint(3);
                    }
                }
            }
        );

    }
);