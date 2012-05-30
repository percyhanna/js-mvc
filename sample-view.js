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
                background: '@background',
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
    titleClicked: function(e) {
        console.log('Title was clicked: ' + this.innerText);
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
        colors = ['silver', 'gray', 'red', 'maroon', 'yellow', 'olive', 'lime', 'green', 'aqua', 'teal', 'blue', 'navy', 'fuchsia', 'purple'],
        myView = new Views.Store.Item.Edit('container', myModel);
    
    console.log(document.getElementById('container').innerHTML = myView.render());
    
    ['test1', 'test2', 'test3'].forEach(function(id) {
        var button = document.getElementById(id);
        button.addEventListener('click', function() {
            var color = colors.shift();
            myModel.title = button.innerText;
            myModel.counter++;
            myModel.background = color;
            myView.update();
            colors.push(color);
        });
    });
    
    document.getElementById('toggle').addEventListener('click', function() {
        myModel.hidden = !myModel.hidden;
        myView.update();
    });
};
