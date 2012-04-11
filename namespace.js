function namespace(ns, val, context) {
    var paths = ns.split('.'),
        length = paths.length,
        cur = context || window,
        last = length - 1;
    for (var index = 0; index < length; index++) {
        var path = paths[index];
        if (!(path in cur)) {
            cur[path] = last === index ? val : {};
        }
        cur = cur[path];
    }
    return cur;
}
