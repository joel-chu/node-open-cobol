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

There are two docker file within this repository, one standard `Dockerfile` and another one `Dockerfile-cn` using Tsinghua University deb source.

First clone this repository

```sh
$ git clone https://github.com/joel-chu/node-open-cobol.git
$ cd node-open-cobol
```

First build it:

**PLEASE REPLACE the &lt;your-user-name&gt; and &lt;container-name&gt; with yours**

```sh
$ docker build -t <your-user-name>/<container-name> .
```

Or build the Chinese source version

```sh
$ docker build -t <your-user-name>/<container-name> -f Dockerfile-cn .
```

Then run it (replace the **&lt;port-you-want&gt;** with yours)

```sh
$ docker run -p <port-you-want>:3001 -d <your-user-name>/<container-name>  
```

Then you can just use it as an HTTP interface as explained above.

---

@TODO 

## Using the cli 

This cli is going to run a docker container in case you do not have the `open-cobol` install on your system.

To run this cli require several setup:

1. Have docker installed on your system
2. Configure docker to run without sudo 
3. You have pull the image we created for this application `joeljiezhu/ubuntu-node-open-cobol` or the CN source `joeljiezhu/ubuntu-node-open-cobol-cn`

In the background it will run the following

```
$ docker run --name ubuntu-node-open-cobol-container -it joeljiezhu/ubuntu-node-open-cobol 

```

The above command is the basic version which actually run a HTTP interface to accept your COBOL code.

You could also pass a `--keep=/path/on/your-system` when you run the cli. And it will run as follow:

```sh
$ docker run --name ubuntu-node-open-cobol-container -d -v /path/on/your-system:/home/app/data:rw joeljiezhu/ubuntu-node-open-cobol  
```

Then it will save the compiled code onto `/path/on/your-system` and you can run it afterward (or provide the code to access other resources on your system)


Complete example with everything 

```sh
$ docker run -d
             --name whatever-name-you-want
             -v /path/on/your/system:/home/app/data:rw 
             -p 43001:3001 
             joeljiezhu/ubuntu-node-open-cobol
```

Then just post to `http://localhost:43001`

---

MIT

Joel Chu (2020)
