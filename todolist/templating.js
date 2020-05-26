// the function of middleware is to give ctx object a binding render so that controller can call it to render view.


const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // create Nunjucks env object:
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // give ctx a binding render function:
        ctx.render = function (view, model) {
            // give the context after render to response.body:
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // set Content-Type:
            ctx.response.type = 'text/html';
        };
        // keep deal the request:
        await next();
    };
}

module.exports = templating;
