import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {style} from '../../../LocalStyles/AskStyles'

const LoadingQuestions = (props) =>
  <div>
    <MuiThemeProvider>
      <RefreshIndicator
            percentage={100}
            size={30}
            left={30}
            top={0}
            loadingColor="#AED6F1" // Overridden by percentage={100}
            status="loading"
            style={style.refresh}
          />
    </MuiThemeProvider>
  </div>


  export default LoadingQuestions
