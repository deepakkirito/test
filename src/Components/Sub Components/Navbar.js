import {
  BrowserRouter, Navigate, Routes, Route, Link
} from "react-router-dom";

import classes from '../../Styles/Sub Styles/Navbar.module.scss'
import Dashboard from './Dashboard.png'
import Products from './Products.png'
import Accounts from './Accounts.png'
import { useState } from "react";

function Navbar() {

  const [it, setIt] = useState(0)

  const Logout = () => {

    localStorage.getItem('user') == 'Kirito' && localStorage.setItem('user', '')
    console.log(localStorage.getItem('user'))

    console.log(localStorage.getItem('user') == ''? '/Login' : '/Dashboard')
    window.location.pathname = '/Login'
  }

  let D = event => {
    // var i = 0;
    // setIt(1) 
    // if(window.location.pathname != '/Dashboard') {
    //   window.location.pathname = '/Dashboard'
    // }

    event.preventDefault();
    
  }
  
  let P = (event) => {
    // if(window.location.pathname != '/Products') {
    //   window.location.pathname = '/Products'
    // }
    event.preventDefault();
  }
  
  let A = (event) => {
    // if(window.location.pathname != '/Accounts') {
    //   window.location.pathname = '/Accounts'
    // }
    event.preventDefault();
  }
  // console.log(it)   

  return (
    <div className={classes.Navbar}>
      <div className={classes.Logo}>
        <a>PRODUCT ADMIN</a>
      </div>
      <div className={classes.Tabs} style={localStorage.getItem('user') == 'Kirito'? {'display': "flex"} : {'display': "none"}}>
        <button onClick={D} title='Click on text' style={window.location.pathname == '/Dashboard'?{'backgroundColor':'rgb(120, 64, 93)','borderBottom':'7px solid rgb(222, 108, 172)'}:{'backgroundColor':'rgb(120, 64, 93, 0)'}}>
        
        <Link to = '/Dashboard'><img src={Dashboard} alt="Dashboard"></img></Link>
        <Link to = '/Dashboard'><a>Dashboard</a></Link>
        </button>
        <button onClick={P} title='Click on text'
        style={window.location.pathname == '/Products'?{'backgroundColor':'rgb(120, 64, 93)','borderBottom':'7px solid rgb(222, 108, 172)'}:{'backgroundColor':'rgb(120, 64, 93, 0)'}}
        >
        <img src={Products} alt="Products"></img>
        <Link to = '/Products'>Products</Link>
        </button>
        <button onClick={A} title='Click on text'
        style={window.location.pathname == '/Accounts'?{'backgroundColor':'rgb(120, 64, 93)','borderBottom':'7px solid rgb(222, 108, 172)'}:{'backgroundColor':'rgb(120, 64, 93, 0)'}}
        >
        <img src={Accounts} alt="Accounts"></img>
        <Link to = '/Accounts'>Accounts</Link>
        </button>
      </div>
      <div

      className={classes.User}
      style={localStorage.getItem('user') == 'Kirito'? {'display': "inline-block"} : {'display': "none"}}
      >
        <p>Welcome Kirito</p>
        <Link to={localStorage.getItem('user') == ''? '/Login' : '/Dashboard'}><button onClick={Logout} >Logout</button></Link>
      </div>
    </div>
  );
}

export default Navbar;
