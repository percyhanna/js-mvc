var appRouter = new Router(),
    routes = appRouter.routes;

routes['home'] = Route.create('/');
routes['about'] = Route.create('/about');
routes['contact_us'] = Route.create('/about/contact_us');
routes['search'] = Route.create('/search/:term');
routes['item_edit'] = Route.create('/item/edit/#id');
routes['item_edit'] = Route.create('/item/edit/#id');
routes['wildcard'] = Route.create('/my/wildcard/*');

// console.log(appRouter.parseRoute('/'));
// console.log(appRouter.parseRoute('/about'));
// console.log(appRouter.parseRoute('/about/'));
// console.log(appRouter.parseRoute('/about/contact_us'));
// console.log(appRouter.parseRoute('/about/contact_us/'));
// console.log(appRouter.parseRoute('/search/car'));
// console.log(appRouter.parseRoute('/search/tree'));
// console.log(appRouter.parseRoute('/item'));
// console.log(appRouter.parseRoute('/item/view/'));
// console.log(appRouter.parseRoute('/item/view/1'));
// console.log(appRouter.parseRoute('/item/view/1/'));
// console.log(appRouter.parseRoute('/item/edit/2/'));
// console.log(appRouter.parseRoute('/my/wildcard/'));
// console.log(appRouter.parseRoute('/my/wildcard/testing/123/'));
// console.log(appRouter.parseRoute('/404'));

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
};
