// The HTTP interface with Koa
const Koa = require('koa')
const openCobol = require('./index.js')

const app = new Koa()
const port = process.NODE_ENV.PORT || DEFAULT_PORT

app.use(bodyParser())

app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body

  console.log(ctx.body)
})

app.listen(port)
