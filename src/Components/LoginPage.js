import classes from '../Styles/LoginPage.module.scss';
import Navbar from './Sub Components/Navbar'
import LoginValidation from './Sub Components/LoginValidation'
import Footer from './Sub Components/Footer'

function Login() {
  return (
    <div className={classes.Login}>

      <Navbar />
      <LoginValidation />
      <Footer />
     
    </div>
  );
}

export default Login;
