"use strict";

class MasonryColumn
{
    private height: number = 0;
    readonly node: Node;

    constructor(node: Node)
    {
        this.node = node;
    }

    /**
     * getHeight
     */
    public getHeight(): number
    {
        return this.height;
    }

    /**
     * setHeight
     */
    public setHeight(height: number): void
    {
        this.height = height;
    }

    /**
     * getNode
     */
    public getNode(): Node
    {
        return this.node;
    }
}

class EasyMasonry
{
    private elements: NodeList;
    private root: HTMLElement;
    private columnTemplate: HTMLElement = document.createElement("masonry-column");
    private columns: Array<MasonryColumn> = [];

    constructor(root: HTMLElement, columns_amount: number, column_width: number = 100/columns_amount)
    {
        this.root = root;
        this.elements = this.root.querySelectorAll(":not(masonry-column)");

        let margins: number = this.calculateMargins();
    
        this.columnTemplate.style.width = `calc(${column_width}% - ${margins}px)`;

        for (let i = 0; i < columns_amount; ++i)
        {
            this.columns[i] = new MasonryColumn(this.columnTemplate.cloneNode(true));
            this.root.appendChild(this.columns[i].node);
        }

        Array.prototype.forEach.call(
            this.elements,
            (element: HTMLElement) =>
            {
                let smallest_column = this.getSmallestColumn();

                this.columns[smallest_column].node.appendChild(element);

                this.columns[smallest_column].setHeight(this.columns[smallest_column].getHeight() + element.offsetHeight);

            }
        );
    }

    private calculateMargins(): number
    {
        let column_template: CSSStyleDeclaration = window.getComputedStyle(this.columnTemplate);

        let margin_left: number = 0;
        let margin_right: number = 0;
        let style: RegExpMatchArray | null;

        if (column_template.marginRight)
        {
            style = column_template.marginRight.match(/[0-9]+/);

            if (style)
            {
                margin_right = +style[0];
            }

        }

        if (column_template.marginLeft)
        {
            style = column_template.marginLeft.match(/[0-9]+/);

            if (style)
            {
                margin_left = +style[0];
            }

        }

        return margin_left + margin_right;

    }

    private getSmallestColumn()
    {
        let smallest_column: any;
        let height: number = 0;
        let current_height: number = 0;

        for (let i = 0; i < this.columns.length; ++i)
        {
            current_height = this.columns[i].getHeight();

            if (i === 0 || current_height < height)
            {
                height = current_height;
                smallest_column = i;
            }
        }

        return smallest_column;
    }

}
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