/**
 * Creates a grid cell
 *
 * @alias GridCell
 * @class
 * @classdesc A cell on the game grid.
 * @param {Grid} pGrid The parent game grid.
 * @param {int} x The x position in the grid for this GridCell.
 * @param {int} y The y position in the grid for this GridCell.
 */
Automatune.GridCell = function(pGrid, x, y) {
    
    "use strict";
    
    assert(arguments.length === 3);
    
    /**
     * The parent {@linkcode Grid} of this GridCell.
     *
     * @public
     * @type {Grid}
     */
    this.parentGrid;
    
    /**
     * The DOM Element that visually represents this GridCell.
     *
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * The DOM Element that contains the {@linkcode Modifier|Modifiers} of this GridCell.
     *
     * @public
     * @type {HTMLElement}
     */
    this.modifiersElement;
    
    /**
     * The grid position of this GridCell.
     *
     * @private
     * @type {Vector2}
     */
    this.pos;
    
    /**
     * The {@linkcode Modifier|Modifiers} associated with this GridCell.
     *
     * @private
     * @type {Modifier[]}
     */
    this.modifiers;
    
    /**
     * The {@linkcode Component} associated with this GridCell, if any.
     *
     * @private
     * @type {Component[]}
     */
    this.component;
    
    // Initialize this GridCell instance.
    
    // Initialize variables
    this.parentGrid = pGrid;
    this.pos = {x: x, y: y};
    this.modifiers = [];
    this.component = null;
    
    // Initialize DOM Element
    var grid_size = this.parentGrid.getGridSize();
    var cell_spacing_percent = 10 / grid_size;
    var cell_size_percent = ((100 - cell_spacing_percent) / grid_size) - cell_spacing_percent;
    
    this.domElement = document.createElement("div");
    this.domElement.setAttribute("data-pos-x", x);
    this.domElement.setAttribute("data-pos-y", y);
    this.domElement.className = "gridCellDiv";
    var cssPos_x = (cell_size_percent + cell_spacing_percent) * x + cell_spacing_percent;
    var cssPos_y = (cell_size_percent + cell_spacing_percent) * y + cell_spacing_percent;
    this.domElement.style.left = cssPos_x + "%";
    this.domElement.style.top = cssPos_y + "%";
    this.domElement.style.width = cell_size_percent + "%";
    this.domElement.style.height = cell_size_percent + "%";
    this.domElement.style.padding = cell_spacing_percent + "%";
    
    this.modifiersElement = document.createElement("div");
    this.modifiersElement.className = "modifiersContainer";
    
    this.domElement.appendChild(this.modifiersElement);
    this.parentGrid.domElement.appendChild(this.domElement);
    
    // Register onClick
    
    this.domElement.onclick = this.onClick.bind(this);
};

/**
 * Returns the name of the class that this object is an instance of.
 *
 * @public
 * @returns {string} className The name of the class that this object is an instance of.
 */
Automatune.GridCell.prototype.getClassName = function() {
    "use strict";
    return "Automatune.GridCell";
};

/**
 * Add a {@linkcode Modifier} to this GridCell.
 *
 * @public
 * @param {Modifier} mod The Modifier to add to this GridCell.
 */
Automatune.GridCell.prototype.addModifier = function(mod) {
    "use strict";
    this.modifiers.push(mod);
};

/**
 * Remove a {@linkcode Modifier} of a certain type from this GridCell.
 * If there are multiple Modifiers of this type, removes the oldest Modifier.
 *
 * @public
 * @param {string} type The class name of the Modifier to remove from this GridCell.
 */
Automatune.GridCell.prototype.removeModifier = function(type) {
    "use strict";
    for (var i = 0; i < this.modifiers.length; i++) {
        var m = this.modifiers[i];
        if (m.getClassName() === type) {
            this.modifiers.splice(i, 1); // Remove modifier from array
            return;
        }
    }
};

/**
 * Remove all {@linkcode Modifier|Modifiers} of a certain type from this GridCell.
 *
 * @public
 * @param {string} type The class name of the Modifiers to remove from this GridCell.
 */
Automatune.GridCell.prototype.removeModifiers = function(type) {
    "use strict";
    for (var i = 0; i < this.modifiers.length; i++) {
        var m = this.modifiers[i];
        if (m.getClassName() === type) {
            this.modifiers.splice(i, 1); // Remove modifier from array
            i--; // Correct for removal
            m.destroy(); // Destroy modifier
        }
    }
};

/**
 * Returns true if this GridCell has a {@linkcode Modifier} of type 'type', otherwise returns false.
 *
 * @public
 * @param {string} type The type of Modifier to check.
 * @returns {boolean} hasModifier
 */
Automatune.GridCell.prototype.hasModifier = function(type) {
    "use strict";
    for (var i = 0; i < this.modifiers.length; i++) {
        var m = this.modifiers[i];
        if (m.getClassName() === type) {
            return true;
        }
    }
    return false;
};

/**
 * Gets the first {@linkcode Modifier} of a certain type that is attached to this GridCell.
 *
 * @public
 * @param {string} type The type of Modifier to check.
 * @returns {Modifier} mod The Modifier that is attached to this GridCell.
 */
Automatune.GridCell.prototype.getModifier = function(type) {
    
};

/**
 * Returns true if this GridCell has a {@linkcode Component} of type 'type', otherwise returns false.
 *
 * @public
 * @param {string} type The type of Component to check.
 * @returns {boolean} hasComponent 
 */
Automatune.GridCell.prototype.hasComponent = function(type) {
    "use strict";
    return this.component !== null;
};

/**
 * Gets the {@linkcode Component} that is attached to this GridCell.
 * If no Component is attached, returns null.
 *
 * @public
 * @returns {Component} component
 */
Automatune.GridCell.prototype.getComponent = function() {
    "use strict";
    return this.component;
};

/**
 * Sets the {@linkcode Component} that is attached to this GridCell.
 *
 * @public
 * @param {Component} ct The Component to attach to this GridCell.
 */
Automatune.GridCell.prototype.setComponent = function(ct) {
    "use strict";
    this.destroyComponent();
    this.component = ct;
    this.domElement.classList.add("active");
};

/**
 * Destroys the {@linkcode Component} that is attached to this GridCell, if any.
 *
 * @public
 */
Automatune.GridCell.prototype.destroyComponent = function() {
    "use strict";
    if (this.component) this.component.destroy();
    this.component = null;
    this.domElement.classList.remove("active");
};

/**
 * Calculate the CSS position of this cell in percentage points relative to the grid.
 *
 * @public
 * @returns {Vector2} pos The CSS position of this cell.
 */
Automatune.GridCell.prototype.getCSSPosition = function() {
    "use strict";
    var g = this.parentGrid;
    var cx = (g.cellCSSWidth + g.cellCSSSpacing) * this.pos.x + g.cellCSSSpacing;
    var cy = (g.cellCSSWidth + g.cellCSSSpacing) * this.pos.y + g.cellCSSSpacing;
    
    return {x: cx, y: cy};
};

/**
 * Called when a {@linkcode Visitor} visits this GridCell.
 * Triggers the onVisit() event for the Component and all Modifiers attached to this GridCell.
 *
 * @private
 * @param {Visitor} visitor The visitor that is visiting this GridCell.
 */
Automatune.GridCell.prototype.onVisit = function(visitor) {
    "use strict";
    if (this.component) this.component.onVisit(visitor);
    for (var i = 0; i < this.modifiers.length; i++) {
        this.modifiers[i].onVisit(visitor);
    }
};

/**
 * Called when this GridCell is clicked.
 *
 * @private
 */
Automatune.GridCell.prototype.onClick = function() {
    "use strict";
    if (!this.hasComponent()) {
        this.setComponent(new Automatune.Component_Arrow(this, Automatune.O_RIGHT));
    } else {
        this.getComponent().rotateRight();
    }
};

/**
 * Constructs a JSON-compatible object representing the current state of this object.
 *
 * @private
 * @returns {Object} save A JSON-compatible object representing a save state.
 */
Automatune.GridCell.prototype.getSaveState = function() {
    "use strict";
    return {
        component: this.component ? this.component.getSaveState() : null,
        modifiers: (function() {
            var result = [];
            for (var i = 0; i < this.modifiers.length; i++) {
                result.push(this.modifiers[i].getSaveState());
            }
            return result;
        }).call(this)
    };
};

/**
 * Applies a save state to this object. Designed to be called in a chain from the main game instance.
 *
 * @private
 * @param {Object} o The save state object to apply.
 */
Automatune.GridCell.prototype.applySaveState = function(o) {
    "use strict";
    
    // Apply component
    if (o.component) {
        var c_instanceName = o.component.instanceOf.split(".")[1]; // e.g. Transforms  "Automatune.Component_Arrow" into "Component_Arrow"
        if (c_instanceName.split("_")[0] === "Component" && Automatune[c_instanceName]) {
            var newComponent = Automatune[c_instanceName].constructFromSaveState(this, o.component);
            this.setComponent(newComponent);
        } else {
            throw "Unexpected Component type";
        }
    }
    
    // Apply modifiers
    for (var i = 0; i < o.modifiers.length; i++) {
        var m_instanceName = o.modifiers[i].instanceOf.split(".")[1];
        if (m_instanceName.split("_")[0] === "Modifier" && Automatune[m_instanceName]) {
            var newModifier = Automatune[m_instanceName].constructFromSaveState(this, o.modifiers[i]);
            this.addModifier(newModifier);
        } else {
            throw "Unexpected Modifier type";
        }
    }
};

