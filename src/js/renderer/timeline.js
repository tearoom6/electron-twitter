import React from 'react'
import ReactDOM from 'react-dom'
import MainContent from './components/MainContent'

import 'photon/dist/css/photon.css'
import '../../css/renderer/timeline.css'

ReactDOM.render(
  React.createElement(MainContent),
  document.getElementById('root')
)
