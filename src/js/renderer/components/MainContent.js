import React from 'react'
import {ipcRenderer} from 'electron'
import Timeline from './Timeline'
import Twitter from '../services/Twitter'

module.exports = class MainContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {user: null, tweets: []}
  }

  render() {
    return (
      <div className='window'>
        <div id='window-content' className='window-content'>
          <Timeline tweets={this.state.tweets}/>
        </div>
      </div>
    )
  }

  componentDidMount() {
    Twitter.get('account/verify_credentials')
      .catch((error) => {
        console.log(error)
      })
      .then((result) => {
        if (result.data.errors) {
          console.log(result.data.errors)
          return
        }
        this.setState({user: result.data})
      })

    Twitter.get('statuses/home_timeline')
      .catch((error) => {
        console.log(error)
      })
      .then((result) => {
        this.setState({tweets: result.data})
        this.connectStream()
      })
  }

  connectStream() {
    const stream = Twitter.stream('user')

    stream.on('error', (error) => {
      throw error
    })

    stream.on('tweet', (tweet) => {
      const tweets = this.state.tweets
      const newTweets = [tweet].concat(tweets)
      this.setState({tweets: newTweets})
      this.notifyIfMention(tweet)
    })
  }

  notifyIfMention(tweet) {
    const isMention = tweet.entities.user_mentions.findIndex((user) => {
        return user.id === this.state.user.id
      }) >= 0
    if (!isMention) {
      return
    }

    new Notification('You gotta a new mention!', {
      body: tweet.text,
      icon: tweet.user.profile_image_url_https
    })

    ipcRenderer.send('newMention')
  }
}
