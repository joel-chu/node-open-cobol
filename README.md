# node-open-cobol

This is a wrapper method to pass COBOL code to `open-cobol` (on Linux) using node.js

It's inspired by [node-cobol](https://github.com/IonicaBizau/node-cobol).

## Example

The API accept two parameters,

* string input - it can be COBOL code or a path to a `.cbl` file contain the COBOL code
* options - currently only expecting one key `args` (or just pass nothing) this contain array of values that will pass to the COBOL code, if you require to pass values to your code.

```js
const openCobol = require('open-cobol')
const helloCbl = `
       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       ENVIRONMENT DIVISION.
       DATA DIVISION.
       PROCEDURE DIVISION.
       PROGRAM-BEGIN.
       DISPLAY "Hello world".
       PROGRAM-DONE.
       STOP RUN.

`

openCobol(helloCbl)
  .then(result => {
    // result = Hello world
  })
```

or you put the above code in a file name `hello.cbl`

```
    IDENTIFICATION DIVISION.
    PROGRAM-ID. HELLO.
    ENVIRONMENT DIVISION.
    DATA DIVISION.
    PROCEDURE DIVISION.
    PROGRAM-BEGIN.
    DISPLAY "Hello world".
    PROGRAM-DONE.
    STOP RUN.
```

Then your js code:

```js
openCobol('hello.cbl')
  .then(result => {
    // result = Hello world
  })

```

---

Coming next an HTTP interface, and a Dockerized version

---

MIT

Joel Chu (2020)
