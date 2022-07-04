"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var checkList = ['png', 'gif', 'svg', 'jpg'];
var utils = {
    isDir: function (path) {
        var res = fs.statSync(path);
        return res.isDirectory();
    },
    getFileSize: function (path) {
        var res = fs.statSync(path);
        return (res.size / 1024).toFixed(2);
    }
};
var count = 0;
function start(route) {
    var isDir = utils.isDir, getFileSize = utils.getFileSize;
    if (isDir(route)) {
        var res = fs.readdirSync(route);
        var ignore = fs.readFileSync('./.gitignore', 'utf-8');
        for (var i = 0; i < res.length; i++) {
            var item = res[i];
            if (!ignore.includes(item)) {
                var itemPath = path.resolve(__dirname, route + '/' + item);
                if (isDir(itemPath)) {
                    start(itemPath);
                }
                else {
                    var extname = path.extname(item).replace('.', '');
                    if (checkList.includes(extname)) {
                        count += 1;
                        console.log(count, itemPath, getFileSize(itemPath) + 'kb');
                    }
                }
            }
        }
    }
    else {
        var extname = path.extname(route);
        if (checkList.includes(extname)) {
            console.log(route);
        }
    }
}
start('/Users/fengli/Bdy/ds_shopadmin_pc/admin');
