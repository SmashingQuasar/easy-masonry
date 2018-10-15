"use strict";

class MasonryColumn
{
    readonly node: HTMLElement;

    constructor(node: HTMLElement)
    {
        this.node = node;
    }

    /**
     * getHeight
     */
    public getHeight(): number
    {
        return this.node.getBoundingClientRect().height;
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
    private elements: Array<any>;
    private root: HTMLElement;
    private columnTemplate: HTMLElement = document.createElement("masonry-column");
    private columns: Array<MasonryColumn> = [];

    constructor(origin: HTMLElement, columns_amount: number = 2)
    {
        this.root = document.createElement("easy-masonry");
        this.elements = Array.from(origin.children);
        origin.appendChild(this.root);
        this.paint(columns_amount);
    }

    /**
     * addNodes
     */
    public async addNodes()
    {
        function nextRepaint()
        {
            return new Promise(
                (accept) =>
                {
                    requestAnimationFrame(accept);
                }
            );
        }
        for (let i: number = 0; i < this.elements.length; ++i)
        {
            await nextRepaint();

            let smallest_column = this.getSmallestColumn();

            this.columns[smallest_column].node.appendChild(this.elements[i]);
        }
    }

    /**
     * add
     */
    public add(node: HTMLElement): void
    {
        let smallest_column: number;

        smallest_column = this.getSmallestColumn();

        this.elements.push(node);

        this.columns[smallest_column].getNode().appendChild(node);
    }

    private getSmallestColumn(): number
    {
        let smallest_column: number = 0;
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

    private removeBaseElements(): void
    {
        Array.prototype.forEach.call(
            this.elements,
            (element: HTMLElement) =>
            {
                element.remove();
            }
        );
    }

    private addColumns(columns_amount: number): void
    {
        this.columns.forEach(
            (column: MasonryColumn) =>
            {
                column.node.remove();
            }
        );
        this.columns = [];

        for (let i: number = 0; i < columns_amount; ++i)
        {
            this.columns[i] = new MasonryColumn(<HTMLElement>this.columnTemplate.cloneNode(true));
            this.root.appendChild(this.columns[i].node);
        }
    }

    public paint(columns_amount: number = 2): void
    {
        this.addColumns(columns_amount);
        this.removeBaseElements();
        this.addNodes();
    }
}