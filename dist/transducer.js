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
var TransducerError = /** @class */ (function (_super) {
    __extends(TransducerError, _super);
    function TransducerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TransducerError;
}(Error));
var Transducer = /** @class */ (function () {
    function Transducer(input, start_state) {
        this.output = [];
        this.input = input;
        this.cur_state = start_state;
    }
    Transducer.prototype.run = function () {
        for (var _i = 0, _a = this.input; _i < _a.length; _i++) {
            var symbol = _a[_i];
            var method = this['state_' + this.cur_state];
            if (typeof method !== 'function') {
                throw new TransducerError("No method handler found for state " + this.cur_state);
            }
            method.call(this, symbol);
        }
        return this.output;
    };
    Transducer.prototype.transition = function (new_state) {
        var handler = this["action_" + this.cur_state + "_exit"];
        if (typeof handler === 'function') {
            handler();
        }
        handler = this["action_transition"];
        if (typeof handler === 'function') {
            handler.call(this, this.cur_state, new_state);
        }
        handler = this["action_" + new_state + "_enter"];
        if (typeof handler === 'function') {
            handler();
        }
        this.cur_state = new_state;
    };
    return Transducer;
}());
exports.Transducer = Transducer;
