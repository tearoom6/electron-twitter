import React from 'react'
import Tweet from './Tweet'

module.exports = class Timeline extends React.Component {
  render() {
    const tweets = this.props.tweets.map((tweet) => {
      return <Tweet tweet={tweet} key={tweet.id}/>
    })

    return (
      <ul className='list-group'>
        {tweets}
      </ul>
    )
  }
}
