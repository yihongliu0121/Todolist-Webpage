var model = require('../model/data');

var fn_list_add = async (ctx, next) => {
    var list = ctx.request.body.list || '';
    console.log(`Add one todo list, content: ${list}`);
    model.writeTodoList(list);
    ctx.response.body = 'success';
}

var fn_list_all = async (ctx, next) => {
    ctx.response.body = model.readTodoList().split('\n');
}

var fn_list_done_all = async (ctx, next) => {
    ctx.response.body = model.readDoneList().split('\n');
}

var fn_list_delete = async (ctx, next) => {
    var list = ctx.request.body.list || '';
    model.deleteTodoList(list);
    ctx.response.body = 'success';
}

var fn_list_done = async (ctx, next) => {
    var list = ctx.request.body.list || '';
    model.finishTodoList(list);
    ctx.response.body = 'success';
}

module.exports = {
    'POST /list/add': fn_list_add,
    'GET /list/all': fn_list_all,
    'GET /list/done/all': fn_list_done_all,
    'POST /list/delete': fn_list_delete,
    'POST /list/done': fn_list_done
}
