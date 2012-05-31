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
    
    console.log(document.getElementById('container').innerHTML = myView.render());
    
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
