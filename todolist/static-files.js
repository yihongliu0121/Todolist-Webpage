const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// url:  like'/static/'
// dir: like __dirname + '/static'
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        // check if it is the correct url:
        if (rpath.startsWith(url)) {
            // get the full path :
            let fp = path.join(dir, rpath.substring(url.length));
            // check if the file exits or not:
            if (await fs.exists(fp)) {
                // search the mime of the file:
                ctx.response.type = mime.lookup(rpath);
                // read context of the file to give it to response.body:
                ctx.response.body = await fs.readFile(fp);
            } else {
                // the file doesn't exit:
                ctx.response.status = 404;
            }
        } else {
            // not the corrcet url, keep dealing the next middleware:
            await next();
        }
    };
}

module.exports = staticFiles;
