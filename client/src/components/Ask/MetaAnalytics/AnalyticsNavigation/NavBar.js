import React from 'react'
import {NavItem, AuthItem} from './SubComponents/NavLink'
import {AnalyticsStyle} from '../../LocalStyles/AnalyticsStyles'

const NavBar = (props) => {
  console.log(props)
  return(
    <ul style={AnalyticsStyle.navStyle.mainList}>
      <li style={AnalyticsStyle.navStyle.listItems}>
        <NavItem icon="arrow-right" style={AnalyticsStyle.navStyle.itemGroup} target="/ask/my-usage" text="My Usage Analytics"  isActive={props.isActive[0]} setActive={props.setActive} index={0}/>
        <NavItem icon="arrow-right" style={AnalyticsStyle.navStyle.itemGroup} target="/ask/community-usage" text="Community Usage Analytics"  isActive={props.isActive[1]} setActive={props.setActive} index={1}/>
      </li>
    </ul>
  )
}

export default NavBar
