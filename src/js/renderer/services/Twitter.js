import Twit from 'twit'
import process from 'process'

module.exports = new Twit({
  consumer_key:        process.env.ELECTRON_TWITTER_CONSUMER_KEY,
  consumer_secret:     process.env.ELECTRON_TWITTER_CONSUMER_SECRET,
  access_token:        process.env.ELECTRON_TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.ELECTRON_TWITTER_ACCESS_TOKEN_SECRET
})
