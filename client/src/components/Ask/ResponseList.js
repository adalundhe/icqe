import React from 'react'
import Response from './Response'
import {TransitionComponent} from '../Helpers/TransitionHoc'

const ResponseList  = (props) =>
    <div>
      {
        props.response.map((item, index) => {
          item.similarities = props.similarities
          return(
            <div key={index}>
              <Response {...item} analyticsSelect={props.analyticsSelect} />
            </div>
            )
          }
        )
      }
    </div>


export default TransitionComponent(ResponseList)
