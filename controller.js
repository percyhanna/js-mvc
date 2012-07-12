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
        var content = {};

        this._contentAreas.forEach(function(area) {
            content[area] = [];
            this[area].forEach(function(view, viewIndex) {
                content[area].push(this._viewFactory(view, viewIndex, area));
            }, this);
        }, this);

        return content;
    },
    
    _viewFactory: function(view, viewIndex, area) {
        if (view.init) {
            return view.init(view);
        } else {
            return new view(area + '_' + viewIndex, this.params);
        }
    }
});

Controller.create = function(name, def) {
    def.name = name;
    var controller = Controller.extend(def);
    namespace('Controllers.' + name, controller);
    return controller;
};
