import React, {Component} from 'react'
import RelevantQuestion from './RelevantQuestion'
import {TransitionComponent} from '../../../../Helpers/TransitionHoc'

const RelevantQuestionsList  = (props) =>
    <div>
      <p style={{fontFamily: 'sans-serif', fontSize: '1.2em', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em', textTransform: 'lowercase', marginBottom: '0', marginLeft: '4em'}}>recommended questions</p>
      {
        props.relevantQuestions.map((item, index) => {
          return(
            <div key={index} style={{marginTop: '25px'}}>
              <RelevantQuestion {...item} />
            </div>
            )
          }
        )
      }
    </div>


export default TransitionComponent(RelevantQuestionsList)
