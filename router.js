var Route = Class.extend({
    init: function(elemnts, wildcard, controller) {
        this.wildcard = !!wildcard;
        this._elements = elemnts || [];
        this.controller = controller;
    },

    match: function(paths) {
        if (paths.length < this._elements.length) {
            return false;
        } else if (!this.wildcard && paths.length > this._elements.length) {
            return false;
        }

        var index, path, element,
            pathLength = this._elements.length;

        for (index = 0; index < pathLength; ++index) {
            path = paths[index];
            element = this._elements[index];
            switch (element.type) {
                case 'static':
                    if (path !== element.content) {
                        return false;
                    }
                    break;

                case 'named':
                    if (element.match && !element.match.test(path)) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    },
    
    parse: function(paths) {
        var index, element,
            parsed = {},
            length = this._elements.length;

        for (index = 0; index < length; ++index) {
            element = this._elements[index];
            switch (element.type) {
                case 'named':
                    parsed[element.name] = paths[index];
                    break;

                default:
                    break;
            }
        }

        if (this.wildcard) {
            parsed.wildcard = paths.slice(this._elements.length);
        }

        return parsed;
    }
});

Route.create = function(path, controller) {
    var index, content, element,
        wildcard = false,
        elements = [],
        paths = Router.cleanPaths(path),
        length = paths.length;

    for (index = 0; index < length; ++index) {
        content = paths[index];

        if (content === '*') {
            wildcard = true;
            continue;
        }

        switch (content.charAt(0)) {
            case ':':
                // Named param
                element = {
                    type: 'named',
                    name: content.substring(1)
                };
                break;

            case '#':
                // Named number param
                element = {
                    type: 'named',
                    name: content.substring(1),
                    match: Router.Matches.number
                };
                break;

            default:
                element = {
                    type: 'static',
                    content: content
                };
                break;
        }

        elements.push(element);
    }

    return new Route(elements, wildcard, controller);
};

var Router = Class.extend({
    init: function() {
        this.routes = {};
    },

    makeDefaultRouter: function() {
        Router.defaultRouter = this;
    },

    addRoute: function(name, route) {
        this.routes[name] = route;
    },

    parseRoute: function(path) {
        var name, route,
            paths = Router.cleanPaths(path);

        for (name in this.routes) {
            route = this.routes[name];
            if (route.match(paths)) {
                return {
                    name: name,
                    route: route,
                    params: route.parse(paths)
                };
            }
        }
        return null;
    },
    
    navigateToPath: function(path) {
        var controller,
            parsedRoute = this.parseRoute(path);
        if (parsedRoute) {
            controller = new parsedRoute.route.controller(parsedRoute.params);
            controller.load();
        }
    }
});

Router.defaultRouter = null;
Router.cleanPaths = function(path) {
    return path.replace(/^\/+|\/+$/g, '').replace(/\/{2,}/g, '/').split('/');
};
Router.init = function() {
    document.addEventListener('click', function(e) {
        if (!e) {
            e = window.event;
        }

        var target = e.srcElement || e.target;
        if (target && target.nodeName.toLowerCase() === 'a' && target.getAttribute('href').charAt(0) === '/') {
            if (Router.defaultRouter) {
                Router.defaultRouter.navigateToPath(target.getAttribute('href'));

                e.cancelBubble = true;
                e.defaultPrevented = true;
                e.returnValue = false;
                return false;
            }
        }
    });
};

Router.Matches = {
    number: /^\d+$/,
};
