'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// mini事件系统
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
function isFunction(func) {
    return !!(func && Object.prototype.toString.call(func) === '[object Function]');
}

var miniEvents = function miniEvents() {
    return {
        queue: null,
        on: function on(evt, func) {
            if (this.queue == null) {
                this.queue = {};
            }
            if (!isArray(this.queue[evt])) {
                this.queue[evt] = [];
            }
            this.queue[evt].push(func);
        },
        fire: function fire(evt, args) {
            var self = this,
                args = args !== undefined ? args : self;

            if (this.queue == null) return false;
            if (!isArray(this.queue[evt])) return false;
            for (var i = 0, len = this.queue[evt].length; i < len; i++) {
                var func = this.queue[evt][i];
                isFunction(func) && func.call(self, args);
            }
            return true;
        },
        set: function set(key, value) {
            if (this[key] !== undefined) {
                this[key] = value;
            }
            this.fire("setValue");
        },
        get: function get(key) {
            if (this[key] !== undefined) {
                return this[key];
            } else {
                return null;
            }
            this.fire("getValue");
        }
    };
};

exports.default = miniEvents;