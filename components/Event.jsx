import EventEmitter from "eventemitter3";

class Event {
    constructor() {
        this.emitter = new EventEmitter();
    }

    /**
     * @param {String} event
     * @param {Function} listener
     * @returns {void}
     * @memberof Event
     * @description Adds a listener to the event emitter.
     * @example
     * event.on("test", () => console.log("test"));
     * event.emit("test"); // "test"
     */
    on(event, listener) {
        this.emitter.on(event, listener);
    }

    /**
     * @param {String} event
     * @param {Function} listener
     * @returns {void}
     * @memberof Event
     * @description Adds a listener to the event emitter that will only be called once.
     * @example
     * event.once("test", () => console.log("test"));
     * event.emit("test"); // "test"
     * The listener will not be called again.
     */
    once(event, listener) {
        this.emitter.once(event, listener);
    }


    /**
     * @param {String} event
     * @param {Function} listener
     * @returns {void}
     * @memberof Event
     * @description Removes a listener from the event emitter.
     * @example
     * const listener = () => console.log("test");
     * event.on("test", listener);
     * event.emit("test"); // "test"
     * event.off("test", listener);
     * event.emit("test"); // nothing
     * The listener will not be called again.
     */
    off(event, listener) {
        this.emitter.off(event, listener);
    }

    /**
     * @param {String} event
     * @param  {...any} args
     * @returns {void}
     * @memberof Event
     * @description Emits an event to the event emitter.
     * @example
     * event.on("test", (arg1, arg2) => console.log(arg1, arg2));
     * event.emit("test", "test1", "test2"); // "test1" "test2"
     * The listener will not be called again.
     */
    emit(event, ...args) {
        // if (typeof window === "undefined") return;

        this.emitter.emit(event, ...args);
    }
}

export default new Event();