/**
 * Initializes Automatune on a div.
 * @class
 * @classdesc The main Automatune class.
 * @param {HTMLElement} domEl The DOM Element (a square div) that Automatune should render in.
 * @param {HTMLElement} playbackEl The DOM Element that contains the Automatune playback controls.
 * @param {int} size The width/height (in cells) of the square grid.
 */
function Automatune(domEl, playbackEl, size) {
    
    "use strict";
    
    assert(arguments.length === 3);
    
    /**
     * The DOM Element that contains the Automatune game.
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * The DOM Element that contains the Automatune playback controls.
     * @public
     * @type {HTMLElement}
     */
    this.playbackElement;
    
    /**
     * The {@linkcode Grid} that contains the {@linkcode GridCell|GridCells} of this Automatune instance.
     * @public
     * @type {Grid}
     */
    this.grid;
    
    /**
     * Objects to call update() on every step.
     * @private
     * @type {Object[]}
     */
    var updateTargets;
    
    /**
     * Updates all active actors (e.g. {@linkcode Visitor|Visitors}, {@linkcode Component|Components},
     * and {@linkcode Modifier|Modifiers} in the system, simulating a step.
     * @private
     */
    function update() {
        
    }
    
    /**
     * Plays the Automatune by starting all {@linkcode Visitor|Visitors},
     * {@linkcode Component|Components}, and {@linkcode Modifier|Modifiers}.
     * @public
     */
    this.play = function() {
        
    };
    
    /**
     * Pauses the Automatune by stopping all {@linkcode Visitor|Visitors},
     * {@linkcode Component|Components}, and {@linkcode Modifier|Modifiers}.
     * @public
     */
    this.pause = function() {
        
    };
    
    /**
     * Creates a new {@linkcode Visitor} on the Automatune grid.
     * @public
     */
    this.createVisitor = function(x, y, orientation) {
        var vis = new Automatune.Visitor(this, x, y, orientation);
        updateTargets.push(vis);
    };
    
    
    // Initialize this Automatune instance.
    
    // Initialize variables
    updateTargets = [];
    this.domElement = domEl;
    this.playbackElement = playbackEl;
    this.grid = new Automatune.Grid(this, size);
    
    // Attach menu system
    new Automatune.Menu(this, playbackEl);
}

// Initialize Automatune
$(document).ready(function() {
    "use strict";
    var el = document.getElementById("automatune");
    var pb = document.getElementById("playback-controls");
    var AutomatuneInst = new Automatune(el, pb, 7);
    AutomatuneInst.createVisitor(4, 4);
    AutomatuneInst.play();
});
