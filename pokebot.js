const config = require('./config.js')
const restify = require('restify')
const builder = require('botbuilder')
const recast = require('recastai')
const recastClient = new recast.Client(config.recast)

// Connection to Microsoft Bot Framework
const connector = new builder.ChatConnector({
  appId: config.appid,
  appPassword: config.secret,
})

const bot = new builder.UniversalBot(connector)
const getGreetings = require('./intents/greetings.js')
const getInfoPokemon = require('./intents/infopokemon.js')
// Event when Message received
bot.dialog('/', (session) => {
  
recastClient.textRequest(session.message.text)
 .then(res => {
   const intent = res.intent()
   const entity = res.get('pokemon')
   //session.send(`Intent: ${intent}`)
   session.send(getGreetings())
   //session.send(`Entity: ${entity}`)
 })
  .catch(() => session.send('I need some sleep right now... Talk to me later!'))
})

// Server Init
const server = restify.createServer()
server.listen(8080)
server.post('/', connector.listen())

