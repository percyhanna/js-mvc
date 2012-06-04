var Controller = Class.extend({
    _contentAreas: ['primary', 'secondary', 'tertiary'],

    init: function(params) {
        this.params = params;
        this._initContentAreas();
    },

    _initContentAreas: function() {
        this._contentAreas.forEach(function(area) {
            if (!this[area]) {
                this[area] = [];
            }
        }, this);
    },

    load: function() {
        this._contentAreas.forEach(function(area) {
            var content = [];
            this[area].forEach(function(viewClass, viewIndex) {
                content.push(new viewClass('' + this + '_' + area + '_' + viewIndex, this.params).render());
            }, this);
            document.getElementById(area).innerHTML = content.join('');
        }, this);
    }
});

Controller.create = function(name, def) {
    def.name = name;
    var controller = Controller.extend(def);
    namespace('Controllers.' + name, controller);
    return controller;
};
