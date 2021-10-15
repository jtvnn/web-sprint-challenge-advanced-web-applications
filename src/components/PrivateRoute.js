import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({component:Component, ...rest})=> {
  return <Route {...rest} render={(props)=> {
      if (localStorage.getItem("token")) {
          return <Component {...props}/>
      } else {
          return <Redirect to='/login'/>
      }
      
  }}/>
}

export default PrivateRoute;


//Task List:
//1. Complete PrivateRoute