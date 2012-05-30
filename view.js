var View = Class.extend((function() {
    function elementFactory(name) {
        var klass,
            element = this.elements[name];

        if (!element) {
            throw new Error('Invalid element named: ' + name);
        }

        klass = element.view || View.Element;
        return new klass(this.uniq + '_' + name, element, this);
    }

    function componentFactory(component) {
        var element, closing, klass, def,
            name = component,
            type = typeof component;

        if (type === 'string') {
            if (name[0] === '@') {
                name = name.substring(1);
                switch (name[0]) {
                    case '<':
                        name = name.slice(1, -1);
                        closing = name[0] === '/';
                        if (closing) {
                            name = name.substring(1);
                        }
                        klass = closing ? View.Components.Wrapper.Close : View.Components.Wrapper.Open;
                        break;
                }
            } else {
                return component;
            }
        }

        // If it's already cached (some elements can be repeated)
        if (this.elementCache[name]) {
            element = this.elementCache[name];
        } else {
            this.elementCache[name] = element = elementFactory.call(this, name);
        }

        // Custom component class?
        if (klass) {
            return new klass(element);
        } else {
            return element;
        }
    }
    
    function processComponents(def) {
        var klass, component, index, element,
            components = this.components.slice(0),
            length = components.length;
        for (index = 0; index < length; index++) {
            component = components[index];

            this.elementCache[component] = components[index] = componentFactory.call(this, component);
        }
        return components;
    }
    
    return {
        init: function(uniq, data) {
            this.uniq = uniq;
            this.data = data;

            this.elementCache = {};

            this.components = processComponents.call(this);
        },
        update: function() {
            var element, name;
            for (name in this.elements) {
                element = this.elementCache[name];
                element.update(this.nodeForElement(name));
            }
        },
        render: function() {
            var rendered = this.components.map(function(component) {
                if (component.render) {
                    return component.render();
                } else {
                    return component;
                }
            }).join('');

            return rendered;
        },
        nodeForElement: function(name) {
            if (this.elementCache[name]) {
                return document.getElementById(this.uniq + '_' + name);
            }
        },
        addEvents: function() {
            var name, element, eventName, node, methodName,
                that = this;
            for (name in this.elements) {
                element = this.elements[name];
                node = this.nodeForElement(name);
                for (eventName in element.events) {
                    methodName = element.events[eventName];
                    if (this[methodName]) {
                        node.addEventListener(eventName, this[methodName].bind(this, node));
                    }
                }
            }
        }
    };
})());

View.Components = (function() {
    var Base = Class.extend({
        init: function() {
            
        },
        
        toString: function() {
            return '';
        }
    });

    return {
        Wrapper: {
            Open: Base.extend({
                init: function(element) {
                    this.element = element;
                },

                toString: function() {
                    return this.element.create().cloneNode(false).outerHTML.replace('</' + this.element.element.tag + '>', '');
                }
            }),

            Close: Base.extend({
                init: function(element) {
                    this.element = element;
                },

                toString: function() {
                    return '</' + this.element.element.tag + '>';
                }
            })
        }
    }
})();

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
    create: function() {
        var el = document.createElement(this.element.tag);
        this.update(el);
        return el;
    },
    render: function() {
        return this.create().outerHTML;
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
    },
    background: function(el, val) {
        el.style.background = val;
    }
};

View.create = function(name, def) {
    var view = View.extend(def);
    namespace('Views.' + name, view);
};
