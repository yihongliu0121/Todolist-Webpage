var view_index = async (ctx, next) => {
    ctx.render('index.html', {});
};

var view_todo = async (ctx, next) => {
    ctx.render('todo.html', {});
}

var view_done = async (ctx, next) => {
    ctx.render('done.html', {});
}

module.exports = {
  'GET /index': view_index,
  'GET /todo': view_todo,
  'GET /done': view_done
}
