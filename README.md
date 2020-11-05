# node-open-cobol

This is a wrapper method to pass COBOL code to `open-cobol` (on Linux) using node.js

It's inspired by [node-cobol](https://github.com/IonicaBizau/node-cobol).

## Installation

```
$ npm install open-cobol
```

## Usage

There are several ways to use this module, explain in detail in the following sections.

## Use as node module

The API accept two parameters:

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

## HTTP interface

You can use it as a module

```js
const openCobolHttp = require('open-cobol/http')
// the underlying application is using Koa
openCobolHttp.listen(8080)
// this will start up the HTTP server on port 8080
// then you an post your code to it
```

It's expecting you to using `POST` using `json` header
with the following keys

* cbl (string) - the actual COBOL code
* args (array<any>) - any argument you want to pass to your COBOL code  

Another way is to clone this repository, then execute within the root folder

```sh
$ npm start
```

It will start the server on port `3001`

Or you can pass an `PORT` variable to change the port

```sh
$ PORT=8080 npm start
```

Then the server will run on port `8080`

## Docker

The quickest way is to pull our docker images 

### For x86 

```
$ docker pull joelchu/ubuntu-node-open-cobol 
```

Then just run it 

```
$ docker run -d -p 3001:3001 -v /path/to/where/you/want:/home/app/data:rw joelchu/ubuntu-node-open-cobol 
```

This will run the `node-open-cobol` in http mode. Then just submit your COBOL code to `http://localhost:3001`, also the compiled COBOL code will be in the `/path/to/where/you/want` folder.

### For ARM 

There are two more images for ARM platform (They were build on Raspberry pi 4b) 

* joeljiezhu/ubuntu-node-open-cobol 
* joeljiezhu/ubuntu-node-open-cobol-cn (this one with source.list from Tsinghua University)


And finally, you can clone this repo and build it yourself. There are `Dockerfile` and `Dockerfile-cn` on the root level of this repo. 


## Using the cli

The command line version is just a simple HTTP client that will call the HTTP intreface,
it's handy for doing some quick test.

```sh
$ npm i node-open-cobol -g
```

Then you will get a `nodecobc` command

First start up your `node-open-cobol/http` interface, or run the docker image, then:

```sh
$ nodecobc /path/to/your/file.cbl
```

If you have change the port (default is 3001) then you can 

```sh
$ nodecobc /path/to/your/file.cbl -p 12345
```

You can also type `nodecobc --help` to learn more 

---

MIT

Joel Chu (2020)
