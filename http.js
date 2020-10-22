// The HTTP interface with Koa
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const openCobol = require('./index.js')
const { DEFAULT_PORT, EXT, ARG, OPT } = require('./lib/constants')
const name = EXT.replace('.', '') // take the dot out

const app = new Koa()
const port = process.env.PORT || DEFAULT_PORT

app.use(bodyParser())

app.use(async ctx => {
  const json = ctx.request.body

  ctx.assert(json[name], 403, 'Unsupported input!')

  let params = {[ARG]: json[ARG], [OPT]: json[OPT]}

  const result = await openCobol(json[name], params)

  console.log('RESULT', result)

  ctx.body = { result }

})

if (require.main === module) {
  app.listen(port)
  console.info(`nodeOpenCobol server started on ${port}`)
}
// also export it
module.exports = app
