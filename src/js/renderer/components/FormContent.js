import React from 'react'
import {ipcRenderer, remote} from 'electron'
import Twitter from '../services/Twitter'
import Draft from '../services/Draft'
import Screenshot from '../services/Screenshot'

module.exports = class FormContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: '', nativeImage: null}
  }

  componentDidMount() {
    Draft.read()
      .catch((error) => {
        console.log(error)
      })
      .then((text) => {
        this.setState({text: text})
      })
  }

  render() {
    return (
      <div className='window'>
        <header className='toolbar toolbar-footer'>
          <div className='toolbar-actions'>
            <button className='btn btn-default pull-right'
                    onClick={this.handleCaptureButtonClick.bind(this)}>
              <span className='icon icon-monitor'></span>
            </button>
          </div>
        </header>
        <div className='window-content'>
          <div>
            <textarea style={{width: 300, height: 250}}
                      onChange={this.handleTextChange.bind(this)}
                      onBlur={this.handleTextBlur.bind(this)}
                      value={this.state.text}/>
          </div>
        </div>
        <footer className='toolbar toolbar-footer'>
          <div className='toolbar-actions'>
            {this.state.nativeImage !== null ?
              <img className='img-rounded media-object pull-left' src={this.state.nativeImage.toDataURL()}
                   width='32' height='32'/>
              : null }
            <button className='btn btn-primary pull-right'
                    onClick={this.handleSendButtonClick.bind(this)}>
              Tweet
            </button>
          </div>
        </footer>
      </div>
    )
  }

  handleTextChange(e) {
    this.setState({text: e.target.value})
  }

  handleTextBlur() {
    Draft.write(this.state.text)
      .catch((error) => {
        console.log(error)
      })
  }

  handleCaptureButtonClick() {
    Screenshot.capture()
      .catch((error) => {
        console.log(error)
      })
      .then((nativeImage) => {
        console.log(nativeImage)
        this.setState({nativeImage: nativeImage})
      })
  }

  handleSendButtonClick() {
    remote.dialog.showMessageBox({
      type: 'question',
      title: 'Confirm',
      message: 'Are you sure to tweet?',
      buttons: ['YES', 'NO'],
      defaultId: 0,
      cancelId: 1
    }, (index) => {
      if (index === 1) {
        return
      }

      new Promise((onFulfilled, _onRejected) => {
        if (this.state.nativeImage === null) {
          onFulfilled()
          return
        }

        return Twitter.post('media/upload', {media_data: this.state.nativeImage.toPng().toString('base64')})
          .catch((error) => {
            console.log(error)
          })
          .then((result) => {
            onFulfilled(result.data.media_id_string)
          })
      }).then((mediaId) => {
        let params = {status: this.state.text.trim()}
        if (mediaId) {
          params.media_ids = [mediaId]
        }

        Twitter.post('statuses/update', params)
          .catch((error) => {
            console.log(error)
          })
          .then((_result) => {
            this.setState({text: '', nativeImage: null})
            ipcRenderer.send('finishTweet')
          })
      })
    })
  }
}
