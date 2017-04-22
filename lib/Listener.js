"use strict";

class Listener {
    notify(params) {
        console.log("Notifying...");
        this.onNotify(params);
    }
}

module.exports = Listener;