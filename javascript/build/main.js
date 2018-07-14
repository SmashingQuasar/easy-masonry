"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class MasonryColumn {
    constructor(node) {
        this.node = node;
    }
    getHeight() {
        return this.node.getBoundingClientRect().height;
    }
    getNode() {
        return this.node;
    }
}
class EasyMasonry {
    constructor(origin, columns_amount = 2) {
        this.columnTemplate = document.createElement("masonry-column");
        this.columns = [];
        this.root = document.createElement("easy-masonry");
        this.elements = Array.from(origin.children);
        origin.appendChild(this.root);
        for (let i = 0; i < columns_amount; ++i) {
            this.columns[i] = new MasonryColumn(this.columnTemplate.cloneNode(true));
            this.root.appendChild(this.columns[i].node);
        }
        Array.prototype.forEach.call(this.elements, (element) => {
            element.remove();
        });
        this.addNodes();
    }
    addNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            function nextRepaint() {
                return new Promise((accept) => {
                    requestAnimationFrame(accept);
                });
            }
            for (let i = 0; i < this.elements.length; ++i) {
                yield nextRepaint();
                let smallest_column = this.getSmallestColumn();
                this.columns[smallest_column].node.appendChild(this.elements[i]);
            }
        });
    }
    getSmallestColumn() {
        let smallest_column;
        let height = 0;
        let current_height = 0;
        for (let i = 0; i < this.columns.length; ++i) {
            current_height = this.columns[i].getHeight();
            if (i === 0 || current_height < height) {
                height = current_height;
                smallest_column = i;
            }
        }
        return smallest_column;
    }
}
