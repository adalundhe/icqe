import React from 'react'
import {NavLink} from 'react-router-dom'
import {Icon} from 'react-fa'
import {buttonStyles, linkStyle} from './NavStyle'


const NavItem = (props) => <button style={ props.isActive ? buttonStyles.buttonSelectedStyle : buttonStyles.buttonStyle} onClick={() => props.setActive(props.index)}>
                              <Icon name={props.isActive ? props.icon : ''} />
                              <NavLink style={linkStyle.normal} to={props.target}>{props.text}</NavLink>
                            </button>


export {NavItem}
