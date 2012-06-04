View.static('Welcome', '<h1>Welcome!</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>');

View.static('About', '<h1>About Us</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>');

View.static('ContactUs', '<h1>Contact Us</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>');

View.static('Search.Results', '<h1>Results</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>');
View.static('Search.Facets', '<h1>Facets</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>');

View.static('Wildcard', '<h1>Wildcard</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>');

View.create('Store.Item.Edit', {
    elements: {
        title: {
            tag: 'h1',
            bindings: {
                text: '@title'
            },
            events: {
                click: 'titleClicked'
            }
        },
        content: {
            tag: 'div',
            bindings: {
                html: '@content'
            }
        },
        counter: {
            tag: 'span',
            bindings: {
                text: '@counter'
            }
        },
        wrapper: {
            tag: 'div',
            bindings: {
                hidden: '@hidden'
            }
        }
    },
    components: [
        '@<wrapper>',
        '@title',
        '@content',
        '<p>The counter is at: ',
        '@counter',
        '</p>',
        '@</wrapper>',
    ],
    titleClicked: function(el) {
        alert('Title was clicked: ' + el.innerText);
    }
});

var appRouter = new Router(),
    routes = appRouter.routes;

Controller.create('Home', {
    primary: [Views.Welcome]
}),
Controller.create('About', {
    primary: [Views.About]
}),
Controller.create('ContactUs', {
    primary: [Views.ContactUs]
}),
Controller.create('Search', {
    primary: [Views.Search.Results],
    secondary: [Views.Search.Facets]
}),
Controller.create('ItemEdit', {
    primary: [Views.Store.Item.Edit]
}),
Controller.create('Wildcard', {
    primary: [Views.Wildcard]
});

routes['home'] = Route.create('/', Controllers.Home);
routes['about'] = Route.create('/about', Controllers.About);
routes['contact_us'] = Route.create('/about/contact_us', Controllers.ContactUs);
routes['search'] = Route.create('/search/:term', Controllers.Search);
routes['item_edit'] = Route.create('/item/edit/#id', Controllers.ItemEdit);
routes['wildcard'] = Route.create('/wildcard/*', Controllers.Wildcard);

window.onload = function() {
    var myModel = {
            title: 'Hello, World!',
            content: '<p>This is a test.</p>',
            background: 'red',
            hidden: false,
            counter: 1
        },
        myView = new Views.Store.Item.Edit('container', myModel);
    
    document.getElementById('container').innerHTML = myView.render();
    
    myView.addEvents();
    
    ['test1', 'test2', 'test3'].forEach(function(id) {
        var button = document.getElementById(id);
        button.addEventListener('click', function() {
            myModel.title = button.innerText;
            myModel.counter++;
            myView.update();
        });
    });
    
    document.getElementById('toggle').addEventListener('click', function() {
        myModel.hidden = !myModel.hidden;
        myView.update();
    });

    appRouter.makeDefaultRouter();
    Router.init();
};
