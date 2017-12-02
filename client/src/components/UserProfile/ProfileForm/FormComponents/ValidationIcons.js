import React from 'react'
import {Icon} from 'react-fa'
import {IconStyle} from './FormComponentStyles'

const ValidIcon = (props) => <Icon style={IconStyle} name={props.valid ? 'check-circle-o' : 'times-circle-o'} />

const InvalidIcon = (props) => <Icon style={IconStyle} name={!props.valid ? 'times-circle-o' : ''} />

export {ValidIcon, InvalidIcon}
