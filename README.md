# toy-html-parser
## Introduction
@champkeh's [toy-html-parser](https://github.com/champkeh/toy-html-parser) rewritten in Typescript.

## Usage
`deno src/test.ts`

## test.ts

```ts
const input = `<html>
    <head>
        <title>cool</title>
    </head>
    <body class="foo bar">
        <img src="a" />
        <input disabled type="text" />
        hello world
    </body>
</html>`;

const parser = new HTMLLexer(input);
const rawToken = parser.run();

// 过滤掉空白无意义token
const result = [];
for (let i = 0; i < rawToken.length; i++) {
    rawToken[i] = rawToken[i].replace(/[\n]/g, '');
    rawToken[i] = rawToken[i].trim();
    if (rawToken[i]) {
        result.push(rawToken[i]);
    }
}
console.log(result);
```
change the content in `input` to see different results.
