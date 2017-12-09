import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isLoggedIn} from './AuthHelpers'

function PrivateRoute ({component: Component, ...rest}) {
  return (
    <Route
      render={(props) => isLoggedIn()
        ? <Component {...props} {...rest} />
        : <Redirect to="/" />}
    />
  )
}

export {PrivateRoute}
