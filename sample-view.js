View.create('Store.Item.Edit', {
    elements: {
        title: {
            tag: 'h1',
            bindings: {
                text: "@title"
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
        }
    },
    components: [
        '<div>',
        '@title',
        '@content',
        '<p>The counter is at: ',
        '@counter',
        '</p></div>',
    ],
    titleClicked: function(e) {
        console.log('Title was clicked: ' + this.innerText);
    }
});

window.onload = function() {
    var myModel = {
            title: 'Hello, World!',
            content: '<p>This is a test.</p>',
            counter: 1
        },
        myView = new Views.Store.Item.Edit();
    
    document.getElementById('container').innerHTML = Views.Store.Item.Edit.render('test', myModel);
    
    ['test1', 'test2', 'test3'].forEach(function(id) {
        var button = document.getElementById(id);
        button.addEventListener('click', function() {
            var button = document.getElementById(id);
            myModel.title = button.innerText;
            myModel.counter++;
            Views.Store.Item.Edit.update('test', myModel);
        });
    });
};
