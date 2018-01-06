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
              <Response geoanalyticsOn={props.geoanalyticsOn} {...item} analyticsSelect={props.analyticsSelect}
              distLen={props.distLen}
              distance={props.geoanalyticsOn? props.distances[index] : 0} />
            </div>
            )
          }
        )
      }
    </div>


export default TransitionComponent(ResponseList)
