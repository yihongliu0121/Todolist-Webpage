const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');
const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

console.log(`The Web Server is Running...`);

// log request URL:
app.use(async (ctx, next) => {
    if (!ctx.request.url.includes('/static/')) {
        console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    }
    var start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

app.listen(3000);
console.log(`Applicaion started at port 3000...`);
