import React from 'react'
import {NavItem, AuthItem} from './SubComponents/NavLink'
import {login, isLoggedIn, logout} from '../../Auth/AuthHelpers'

const NavStyle = {
  mainList: {
    textAlign: "center",
    marginLeft: '25%',
    marginRight: '25%',
    width: '50%',
    paddingLeft: '0'
  },
  listItems: {
      display: "inline",
  },
  itemGroup: {
    marginLeft: "2em",
    marginRight: "2em",
  }
}

const NavBar = (props) => {
  return(
    <ul style={NavStyle.mainList}>
      <li style={NavStyle.listItems}>
        <NavItem target="/" text="Home" icon="linode" isActive={props.isActive[0]} setActive={props.setActive} index={0}/>
      </li>
      {
        !isLoggedIn() ? <li style={NavStyle.listItems}>
                          <AuthItem icon="cogs"  style={NavStyle.itemGroup} target="/user-profile" action={login} text="Login/Signup"  isActive={props.isActive[1]} setActive={props.setActive} index={1}/>
                        </li> :
                        <li style={NavStyle.listItems}>
                          <NavItem icon="code" style={NavStyle.itemGroup} target="/ask" text="Ask"  isActive={props.isActive[2]} setActive={props.setActive} index={2}/>
                          <NavItem icon="address-book-o" style={NavStyle.itemGroup} target="/user-profile" text="Profile"  isActive={props.isActive[3]} setActive={props.setActive} index={3}/>
                          <AuthItem icon="sign-out" style={NavStyle.itemGroup} target="/" action={logout} text="Logout" isActive={props.isActive[4]} setActive={props.setActive} index={4} />
                        </li>
      }
    </ul>
  )
}

export default NavBar
