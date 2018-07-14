"use strict";
var MasonryColumn = (function () {
    function MasonryColumn(node) {
        this.height = 0;
        this.node = node;
    }
    MasonryColumn.prototype.getHeight = function () {
        return this.height;
    };
    MasonryColumn.prototype.setHeight = function (height) {
        this.height = height;
    };
    MasonryColumn.prototype.getNode = function () {
        return this.node;
    };
    return MasonryColumn;
}());
var EasyMasonry = (function () {
    function EasyMasonry(root, columns_amount, column_width) {
        if (column_width === void 0) { column_width = 100 / columns_amount; }
        var _this = this;
        this.columnTemplate = document.createElement("masonry-column");
        this.columns = [];
        this.root = root;
        this.elements = this.root.querySelectorAll(":not(masonry-column)");
        var margins = this.calculateMargins();
        this.columnTemplate.style.width = "calc(" + column_width + "% - " + margins + "px)";
        for (var i = 0; i < columns_amount; ++i) {
            this.columns[i] = new MasonryColumn(this.columnTemplate.cloneNode(true));
            this.root.appendChild(this.columns[i].node);
        }
        Array.prototype.forEach.call(this.elements, function (element) {
            var smallest_column = _this.getSmallestColumn();
            _this.columns[smallest_column].node.appendChild(element);
            _this.columns[smallest_column].setHeight(_this.columns[smallest_column].getHeight() + element.offsetHeight);
        });
    }
    EasyMasonry.prototype.calculateMargins = function () {
        var column_template = window.getComputedStyle(this.columnTemplate);
        var margin_left = 0;
        var margin_right = 0;
        var style;
        if (column_template.marginRight) {
            style = column_template.marginRight.match(/[0-9]+/);
            if (style) {
                margin_right = +style[0];
            }
        }
        if (column_template.marginLeft) {
            style = column_template.marginLeft.match(/[0-9]+/);
            if (style) {
                margin_left = +style[0];
            }
        }
        return margin_left + margin_right;
    };
    EasyMasonry.prototype.getSmallestColumn = function () {
        var smallest_column;
        var height = 0;
        var current_height = 0;
        for (var i = 0; i < this.columns.length; ++i) {
            current_height = this.columns[i].getHeight();
            if (i === 0 || current_height < height) {
                height = current_height;
                smallest_column = i;
            }
        }
        return smallest_column;
    };
    return EasyMasonry;
}());
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
