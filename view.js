var View = Class.extend((function() {
    function processComponents(view, def) {
        var index = 0,
            components = def.components,
            length = components.length,
            component;
        for (; index < length; index++) {
            component = components[index];
            if (component[0] === '@') {
                component = component.substring(1);
                if (def.elements[component]) {
                    view.elements[component] = components[index] = new View.Element(view.uniq + '_' + component, def.elements[component]);
                } else {
                    throw new Error('Invalid element name: ' + component);
                }
            }
        }
        return components;
    }
    
    return {
        init: function(uniq, data, def) {
            this.uniq = uniq;
            this.elements = {};
            this.data = data;

            this._components = processComponents(this, def);
        },
        update: function() {
            for (var name in this.elements) {
                var element = this.elements[name],
                    el = document.getElementById(this.uniq + '_' + name);
                element.update(el, this.uniq, this.data);
            }
        },
        render: function() {
            var rendered = this._components.map(function(component) {
                if (component.render) {
                    return component.render(this.data);
                } else {
                    return component;
                }
            }).join('');

            // Event handlers
            for (var name in this.elements) {
                this.elements[name].
            }
        }
    };
})());

View.Element = Class.extend({
    init: function(name, element) {
        this.name = name;
        this.element = element;
    },
    update: function(el, data) {
        var bindings = this.element.bindings;
        el.setAttribute('id', this.name);
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
    render: function(data) {
        var el = document.createElement(this.element.tag);
        this.update(el, data);
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
    var view = View.extend(def);
    namespace('Views.' + name, view);
};
