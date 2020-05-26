var fs = require("fs");

function readFile(fileName) {
    console.log("Synchronous reading...");
    var data = fs.readFileSync(fileName, 'utf8');
    console.log("Synchronous read completed...");
    return data;
}

function appendFile(fileName, data) {
    console.log("Synchronous appending...");
    fs.appendFileSync(fileName, data + '\n', 'utf8');
    console.log("Synchronous append completed...");
}

function writeFile(fileName, data) {
    console.log("Synchronous writing...");
    fs.writeFileSync(fileName, data + '\n', 'utf8');
    console.log("Synchronous read completed...");
}

function readTodoList() {
    return readFile(__dirname + '/todo.txt');
}

function readDoneList() {
    return readFile(__dirname + '/done.txt');
}

function writeTodoList(data) {
    return appendFile(__dirname + '/todo.txt', data);
}

function writeDoneList(data) {
    return appendFile(__dirname + '/done.txt', data);
}

function deleteTodoList(data) {
    var lists = readFile(__dirname + '/todo.txt').split('\n');
    var leftLists = '';
    var isDelete = false;
    for (var i = 0; i < lists.length - 1; i++) {
        if (isDelete) {
          leftLists += (lists[i] + '\n');
        } else {
            if (lists[i] === data) {
              isDelete = true;
            } else {
                if (lists[i] !== '') {
                    leftLists += lists[i];
                    if (i !== lists.length - 2) {
                        leftLists += '\n';
                    }
                }
            }
        }
    }
    writeFile(__dirname + '/todo.txt', leftLists);
}

function finishTodoList(data) {
    var lists = readFile(__dirname + '/todo.txt').split('\n');
    var leftLists = '';
    var isDelete = false;
    for (var i = 0; i < lists.length - 1; i++) {
        if (isDelete) {
          leftLists += (lists[i] + '\n');
        } else {
            if (lists[i] === data) {
              isDelete = true;
            } else {
                if (lists[i] !== '') {
                    leftLists += lists[i];
                    if (i !== lists.length - 2) {
                        leftLists += '\n';
                    }
                }
            }
        }
    }
    console.log(data);
    writeDoneList(data);
    writeFile(__dirname + '/todo.txt', leftLists);
}

module.exports = {
    'readTodoList': readTodoList,
    'readDoneList': readDoneList,
    'writeTodoList': writeTodoList,
    'writeDoneList': writeDoneList,
    'deleteTodoList': deleteTodoList,
    'finishTodoList': finishTodoList
}
