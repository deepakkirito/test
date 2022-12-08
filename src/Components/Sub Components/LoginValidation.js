import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import classes from '../../Styles/Sub Styles/LoginValidation.module.scss'

function LoginValidation() {

  const {InputValues} = useParams();
  const [Input, setInput] = useState({username:'', password:''});

  const Data =(values) => {
    (values.name == 'Username')? setInput({username:values.value, password:Input.password}):setInput({username:Input.username, password:values.value})  
  }

  const submit = event => {

    event.preventDefault();
    console.log('form submitted ✅');
  };

  const Validation = () => {

    if(Input.username === 'Kirito' && Input.password === 'Kirito') {
      localStorage.setItem('user', 'Kirito')
      console.log(localStorage.getItem('user'))
    } else {
      alert('Invalid Username or Password')
    }
  }

  return (
    <div className={classes.LoginValidation}>

      <form onSubmit={submit} onChange={(e) => {Data(e.target)}}>
        <h2>ADMIN Login</h2>
        <input type={'text'} placeholder={'Username(Kirito)'} name={'Username'}></input>
        <input type={'password'} placeholder={'Password(Kirito)'} name={'Password'}></input>
        <button onClick={Validation}><Link to= {localStorage.getItem('user') == 'Kirito'? '/Dashboard' : '/Login'}>Login</Link></button>
        <button onClick={() => {alert('Username: Kirito && Password: Kirito')}}>Forgot Password</button>
      </form>
     
    </div>
  );
}

export default LoginValidation;
