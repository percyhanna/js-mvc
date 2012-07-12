var Render = {
    HTML: function(content) {
        // TODO: render raw HTML (for server-side response)
    },
    
    Browser: function(content) {
        var area, el;

        for (area in content) {
            el = document.getElementById(area);
            if (el) {
                el.innerHTML = content[area].join('');
            }
        }
    },
    
    content: function(content) {
        // Browser or not?
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            return this.Browser(content);
        } else {
            return this.HTML(content);
        }
    }
}