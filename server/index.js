const express = require('express')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const twitter = require('twitter-lite')
const TwitterStrategy = require('passport-twitter').Strategy
const { initialize } = require('passport')
const { v4: uuidv4 } = require('uuid');
//const { clientSecret } = require('../config')
const config = require('../config/config') // Add this to run locally

const consumerKey = process.env.CONSUMER_KEY
const consumerSecret = process.env.CONSUMER_SECRET
//  const consumerKey = config['consumer_key']
//  const consumerSecret = config['consumer_secret']

// for seesion id
let sessionId = ''

let user = {}
let liteArgs = {  
  consumer_key: consumerKey ,  
  consumer_secret: consumerSecret,  
  access_token_key: '',  
  access_token_secret: ''  
}
let client
const PORT = process.env.PORT || 5000

passport.use(new TwitterStrategy({
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  callbackURL: '/auth/twitter/callback'
},
function(token, tokenSecret, profile, cb) {
   user = { ...profile }
   liteArgs['access_token_key'] = token
   liteArgs['access_token_secret'] = tokenSecret
   client = new twitter(liteArgs)
  return cb(null, profile)
}));

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj,cb) => {
  cb(null, obj)
})

const app = express()
app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')))

// Allows data from forms to be accessed
app.use(express.urlencoded({ extended: true }))
app.use(session({
  genid: () => {
    sessionId = uuidv4()
    return sessionId
  },
  secret: 'keyboard cat', resave: true, saveUninitialized: true, secure: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
      //res.redirect('http://localhost:3000/Profile')
      res.redirect('https://brentg123-twitter-project.herokuapp.com/Profile')
  })
app.get('/user', (req, res) => {
    res.send(user) //: console.log('Not logged in!') 
})
// app.get('/auth/logout', (req, res) => {
//     console.log('logging out!')
//     user = {}
//     res.redirect('/')
// })

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.post('/tweet', (req, res) => {
  res.sendStatus(200)
  const tweet = req.body.tweet
  
  if (tweet.length == 0) {
    console.error('Text field is empty - there is nothing to tweet!')
  }
  else if (tweet.length > 280) {
    console.error('There are too many characters in your tweet - cannont post message!')
  }
  else {
    client.post('statuses/update', { status: req.body.tweet }).then(result => 
      {console.log('You successfully tweeted this : "' + result.text + '"')})
      .catch(console.error)
  }
}
)

app.listen(PORT, () => console.log('Server is running'))