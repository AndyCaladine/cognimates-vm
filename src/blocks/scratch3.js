function Scratch3Blocks(runtime) {
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    this.runtime = runtime;
}

/**
 * Retrieve the block primitives implemented by this package.
 * @return {Object.<string, Function>} Mapping of opcode to Function.
 */
Scratch3Blocks.prototype.getPrimitives = function() {
    return {
        'control_repeat': this.repeat,
        'control_forever': this.forever,
        'control_wait': this.wait,
        'control_stop': this.stop,
        'event_whenflagclicked': this.whenFlagClicked,
        'event_whenbroadcastreceived': this.whenBroadcastReceived,
        'event_broadcast': this.broadcast
    };
};

Scratch3Blocks.prototype.repeat = function() {
    console.log('Running: control_repeat');
};

Scratch3Blocks.prototype.forever = function() {
    console.log('Running: control_forever');
};

Scratch3Blocks.prototype.wait = function(argValues, util) {
    console.log('Running: control_wait');
    util.yield();
    util.timeout(function() {
        util.done();
    }, 500);
};

Scratch3Blocks.prototype.stop = function() {
    console.log('Running: control_stop');
};

Scratch3Blocks.prototype.whenFlagClicked = function() {
    console.log('Running: event_whenflagclicked');
};

Scratch3Blocks.prototype.whenBroadcastReceived = function() {
    console.log('Running: event_whenbroadcastreceived');
};

Scratch3Blocks.prototype.broadcast = function() {
    console.log('Running: event_broadcast');
};

module.exports = Scratch3Blocks;