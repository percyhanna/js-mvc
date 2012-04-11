View.create('Store.Item.Edit', {
    elements: {
        title: {
            tag: 'h1',
            bindings: {
                text: "@title"
            }
        },
        content: {
            tag: 'div',
            bindings: {
                html: '@content'
            }
        }
    },
    render: function(uniq, data) {
        this.data = data;
        this.uniq = uniq;
        return '<div>' + this.element('title') + this.element('content') + '</div>';
    },
    afterInsert: function(uniq, data) {
        // nothing
    }
});

window.onload = function() {
    document.body.innerHTML = Views.Store.Item.Edit.render('test', {
        title: 'Hello, World!',
        content: '<p>This is a test.'
    });
};
