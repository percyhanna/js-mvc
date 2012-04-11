var View = Class.extend({
    init: function(def) {
        this.elements = def.elements || {};
        this.render = def.render;
        this.afterInsert = def.afterInsert;
        this.data = {};
    },
    update: function(uniq, data) {
        for (var name in this.elements) {
            var element = new View.Element(name, uniq, this.elements[name], data),
                el = document.getElementById(uniq + '_' + name);
            element.update(el);
        }
    },
    element: function(name) {
        if (!this.elements[name]) {
            return '';
        }
        return new View.Element(name, this.uniq, this.elements[name], this.data);
    }
});

View.Element = Class.extend({
    init: function(name, uniq, element, data) {
        this.name = name;
        this.uniq = uniq;
        this.element = element;
        this.data = data;
    },
    update: function(el) {
        var bindings = this.element.bindings,
            key,
            value;
        el.setAttribute('id', this.uniq + '_' + this.name);
        for (var binding in this.element.bindings) {
            key = bindings[binding];
            value = this.loadValue(key);
            View.Element.Bindings[binding](el, value);
        }
    },
    loadValue: function(key) {
        if (key.charAt(0) === '@') {
            key = key.substring(1);
            return this.data[key];
        } else {
            return 'No value...';
        }
    },
    toString: function() {
        var el = document.createElement(this.element.tag);
        this.update(el);
        return el.outerHTML;
    }
});

View.Element.Bindings = {
    text: function(el, val) {
        el.innerText = val;
    },
    html: function(el, val) {
        el.innerHTML = val;
    }
};

View.create = function(name, def) {
    var view = new View(def);
    namespace('Views.' + name, view);
};
