var View = Class.extend((function() {
    function processComponents(def) {
        var klass, component, index, element,
            components = this.components,
            length = components.length;
        for (index = 0; index < length; index++) {
            component = components[index];
            if (component[0] === '@') {
                component = component.substring(1);
                element = this.elements[component];
                if (element) {
                    klass = View.Element;
                    if (element.view) {
                        klass = element.view;
                    }
                    this._elementCache[component] = components[index] = new klass(this.uniq + '_' + component, element, this);
                } else {
                    throw new Error('Invalid element name: ' + component);
                }
            }
        }
        return components;
    }
    
    return {
        init: function(uniq, data) {
            this.uniq = uniq;
            this.data = data;

            this._elementCache = {};

            this._components = processComponents.call(this);
        },
        update: function() {
            for (var name in this.elements) {
                var element = this._elementCache[name],
                    el = document.getElementById(this.uniq + '_' + name);
                element.update(el);
            }
        },
        render: function() {
            var rendered = this._components.map(function(component) {
                if (component.render) {
                    return component.render();
                } else {
                    return component;
                }
            }).join('');

            // Event handlers
            for (var name in this.elements) {
            }
            
            return rendered;
        }
    };
})());

View.Element = Class.extend({
    init: function(name, element, view) {
        this.name = name;
        this.element = element;
        this.view = view;
    },
    update: function(el) {
        var bindings = this.element.bindings;
        el.setAttribute('id', this.name);
        for (var binding in bindings) {
            View.Element.Bindings[binding](el, this.loadValue(bindings[binding]));
        }
    },
    loadValue: function(key) {
        if (key.charAt(0) === '@') {
            key = key.substring(1);
            return this.view.data[key];
        } else {
            return 'No value...';
        }
    },
    render: function() {
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
    },
    hidden: function(el, val) {
        el.style.display = !!val ? 'none' : 'block';
    }
};

View.create = function(name, def) {
    var view = View.extend(def);
    namespace('Views.' + name, view);
};
