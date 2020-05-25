"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var input = "<html>\n    <head>\n        <title>cool</title>\n    </head>\n    <body class=\"foo \n        <img src=\"a\" />\n        <input disabled type=\"text\" />\n        hello world\n    </body>\n</html>";
var parser = new lexer_1.HTMLLexer(input);
var rawToken = parser.run();
var result = [];
for (var i = 0; i < rawToken.length; i++) {
    rawToken[i] = rawToken[i].replace(/[\n]/g, '');
    rawToken[i] = rawToken[i].trim();
    if (rawToken[i]) {
        result.push(rawToken[i]);
    }
}
console.log(result);
