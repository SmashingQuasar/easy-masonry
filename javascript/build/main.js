"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MasonryColumn = (function () {
    function MasonryColumn(node) {
        this.node = node;
    }
    MasonryColumn.prototype.getHeight = function () {
        return this.node.getBoundingClientRect().height;
    };
    MasonryColumn.prototype.getNode = function () {
        return this.node;
    };
    return MasonryColumn;
}());
var EasyMasonry = (function () {
    function EasyMasonry(origin, columns_amount) {
        if (columns_amount === void 0) { columns_amount = 2; }
        this.columnTemplate = document.createElement("masonry-column");
        this.columns = [];
        this.root = document.createElement("easy-masonry");
        this.elements = Array.from(origin.children);
        origin.appendChild(this.root);
        this.paint(columns_amount);
    }
    EasyMasonry.prototype.addNodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            function nextRepaint() {
                return new Promise(function (accept) {
                    requestAnimationFrame(accept);
                });
            }
            var i, smallest_column;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.elements.length)) return [3, 4];
                        return [4, nextRepaint()];
                    case 2:
                        _a.sent();
                        smallest_column = this.getSmallestColumn();
                        this.columns[smallest_column].node.appendChild(this.elements[i]);
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    EasyMasonry.prototype.add = function (node) {
        var smallest_column;
        smallest_column = this.getSmallestColumn();
        this.elements.push(node);
        this.columns[smallest_column].getNode().appendChild(node);
    };
    EasyMasonry.prototype.getSmallestColumn = function () {
        var smallest_column = 0;
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
    EasyMasonry.prototype.removeBaseElements = function () {
        Array.prototype.forEach.call(this.elements, function (element) {
            element.remove();
        });
    };
    EasyMasonry.prototype.addColumns = function (columns_amount) {
        this.columns.forEach(function (column) {
            column.node.remove();
        });
        this.columns = [];
        for (var i = 0; i < columns_amount; ++i) {
            this.columns[i] = new MasonryColumn(this.columnTemplate.cloneNode(true));
            this.root.appendChild(this.columns[i].node);
        }
    };
    EasyMasonry.prototype.paint = function (columns_amount) {
        if (columns_amount === void 0) { columns_amount = 2; }
        this.addColumns(columns_amount);
        this.removeBaseElements();
        this.addNodes();
    };
    return EasyMasonry;
}());
