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
            var margin_top = 0;
            var margin_bottom = 0;
            var element_style = window.getComputedStyle(element);
            var matched_style;
            if (element_style) {
                if (element_style.marginTop) {
                    matched_style = element_style.marginTop.match(/[0-9]+/);
                    if (matched_style) {
                        margin_top = +matched_style[0];
                    }
                }
                if (element_style.marginBottom) {
                    matched_style = element_style.marginBottom.match(/[0-9]+/);
                    if (matched_style) {
                        margin_bottom = +matched_style[0];
                    }
                }
            }
            var height = _this.columns[smallest_column].getHeight() + element.offsetHeight + margin_bottom + margin_top;
            _this.columns[smallest_column].setHeight(height);
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
