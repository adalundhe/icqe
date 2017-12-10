import React, {Component} from 'react'
import RelevantQuestion from './RelevantQuestion'
import {TransitionComponent} from '../../../../Helpers/TransitionHoc'

const RelevantQuestionsList  = (props) =>
    <div>
      <div>
        <p style={{fontFamily: 'sans-serif', fontSize: '1.2em', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em', textTransform: 'lowercase',
        marginBottom: '0', textAlign: 'center', minWidth: '100%'}}>recommended questions</p>
      </div>
      <div style={{display: 'flex', alignSelf: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
      {
        props.relevantQuestions.map((item, index) => {
          return(
            <div key={index} style={{marginTop: '25px', width: '100%'}}>
              <RelevantQuestion {...item} />
            </div>
            )
          }
        )
      }
      </div>
    </div>


export default TransitionComponent(RelevantQuestionsList)
