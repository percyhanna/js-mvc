var View = Class.extend({
    init: function(def) {
        this.elements = {};
        this.data = {};

        var index = 0,
            components = def.components,
            length = components.length,
            component;
        for (; index < length; index++) {
            component = components[index];
            if (component[0] === '@') {
                component = component.substring(1);
                if (def.elements[component]) {
                    this.elements[component] = components[index] = new View.Element(component, def.elements[component]);
                } else {
                    throw new Error('Invalid element name: ' + component);
                }
            }
        }
        this._components = components;
    },
    update: function(uniq, data) {
        for (var name in this.elements) {
            var element = this.elements[name],
                el = document.getElementById(uniq + '_' + name);
            element.update(el, uniq, data);
        }
    },
    render: function(uniq, data) {
        return this._components.map(function(component) {
            if (typeof component === 'string') {
                return component;
            } else {
                console.log(component);
                return component.render(uniq, data);
            }
        }).join('');
    }
});

View.Element = Class.extend({
    init: function(name, element) {
        this.name = name;
        this.element = element;
    },
    update: function(el, uniq, data) {
        var bindings = this.element.bindings;
        el.setAttribute('id', uniq + '_' + this.name);
        for (var binding in bindings) {
            View.Element.Bindings[binding](el, this.loadValue(bindings[binding], data));
        }
    },
    loadValue: function(key, data) {
        if (key.charAt(0) === '@') {
            key = key.substring(1);
            return data[key];
        } else {
            return 'No value...';
        }
    },
    render: function(uniq, data) {
        var el = document.createElement(this.element.tag);
        this.update(el, uniq, data);
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
