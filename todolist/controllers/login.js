var view_login = async (ctx, next) => {
    ctx.render('login.html', {});
};

var fn_login = async (ctx, next) => {
    var email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    console.log(`Login with email: ${email}, password: ${password}`);
    if (email === '123@qq.com' && password === '123456') {
        ctx.render('index.html', {});
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
}

module.exports = {
  'GET /login': view_login,
  'POST /login': fn_login
}
