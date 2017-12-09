import React from 'react'
import {Icon} from 'react-fa'


const stackStyle = {
  fontSize: "8em",
  textAlign: "center",
  color: "rgba(0,0,0,0.6)",
  marginTop: "1em",
  marginBottom: "1em"
}

const SplashScreen = (props) => {
  return(
    <div style={stackStyle}>
      <Icon name="stack-overflow" spin={false}/>
    </div>
  )
}

export default SplashScreen
