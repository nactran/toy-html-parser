"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var transducer_1 = require("./transducer");
var HTMLLexer = /** @class */ (function (_super) {
    __extends(HTMLLexer, _super);
    function HTMLLexer(s) {
        var _this = _super.call(this, s, 'data') || this;
        _this.output.push('');
        return _this;
    }
    HTMLLexer.prototype.state_data = function (c) {
        if (c === '<') {
            this.append_word();
            this.append_char(c);
            this.transition('tag_open');
        }
        else {
            this.append_char(c);
        }
    };
    HTMLLexer.prototype.state_tag_open = function (c) {
        if (c === '/') {
            this.append_char(c);
            this.transition('tag_end_open');
        }
        else {
            this.append_char(c);
            this.transition('tag_start_open');
        }
    };
    HTMLLexer.prototype.state_tag_start_open = function (c) {
        if (c === ' ') {
            this.append_word();
            this.transition('attribute');
        }
        else if (c === '>') {
            this.append_char(c);
            this.append_word();
            this.transition('data');
        }
        else {
            this.append_char(c);
        }
    };
    HTMLLexer.prototype.state_attribute = function (c) {
        if (c === '>') {
            this.append_word();
            this.append_char(c);
            this.append_word();
            this.transition('data');
        }
        else if (/[a-zA-Z]/.test(c)) {
            this.append_char(c);
            this.transition('attribute_name');
        }
        else if (c === '/') {
            this.append_word();
            this.append_char(c);
            this.transition('tag_end_open');
        }
    };
    HTMLLexer.prototype.state_attribute_name = function (c) {
        if (c === '=') {
            this.append_char(c);
            this.transition('attribute_value');
        }
        else if (c === ' ') {
            this.append_word();
            this.transition('attribute');
        }
        else if (c === '>') {
            this.append_word();
            this.transition('data');
        }
        else {
            this.append_char(c);
        }
    };
    HTMLLexer.prototype.state_attribute_value = function (c) {
        if (c === '\'') {
            this.append_char(c);
            this.transition('attribute_value_start_single_quote');
        }
        else if (c === '"') {
            this.append_char(c);
            this.transition('attribute_value_start_double_quote');
        }
        else if (/[ >]/.test(c)) {
            this.append_word();
            this.transition('attribute');
        }
        else {
            this.append_char(c);
        }
    };
    HTMLLexer.prototype.state_attribute_value_start_single_quote = function (c) {
        if (c === '\'') {
            this.append_char(c);
            this.append_word();
            this.transition('attribute');
        }
        else {
            this.append_char(c);
        }
    };
    HTMLLexer.prototype.state_attribute_value_start_double_quote = function (c) {
        if (c === '"') {
            this.append_char(c);
            this.append_word();
            this.transition('attribute');
        }
        else {
            this.append_char(c);
        }
    };
    HTMLLexer.prototype.state_tag_end_open = function (c) {
        if (c === '>') {
            this.append_char(c);
            this.append_word();
            this.transition('data');
        }
        else {
            this.append_char(c);
        }
    };
    HTMLLexer.prototype.append_word = function () {
        if (this.output[this.output.length - 1]) {
            this.output.push('');
        }
    };
    HTMLLexer.prototype.append_char = function (c) {
        this.output[this.output.length - 1] += c;
    };
    return HTMLLexer;
}(transducer_1.Transducer));
exports.HTMLLexer = HTMLLexer;
