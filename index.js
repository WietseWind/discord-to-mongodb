const Discord = require("discord.js")
const client = new Discord.Client()
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017', (err, mongo) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Connected to MongoDB');
  db = mongo.db('discord')
  collection = db.collection('log')

  client.on('ready', () => {
    console.log(`Discord Logged in as ${client.user.tag}!`)
  })

  client.on('message', msg => {
    collection.insertOne({
      moment: new Date(),
      chanel: msg.channel.name,
      userId: msg.author.id,
      userName: msg.author.username,
      message: msg.content,
      words: msg.content.trim().toLowerCase().split(' ').filter((word) => {
        return word.replace(/[,\.!()]/g, ' ').trim().match(/^[a-z]{3,16}$/)
      }).map((r) => { return r.replace(/[,\.!()]/g, ' ').trim() })
    })
    console.log(msg.channel.name, msg.author.id, msg.author.username)
  })

  client.login('...discordbotkey...')
})
