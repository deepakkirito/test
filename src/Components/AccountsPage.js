import classes from '../Styles/AccountsPage.module.scss';
import Footer from './Sub Components/Footer';
import Navbar from './Sub Components/Navbar';
import AccountsDetails from './Sub Components/AccountsDetails';

function Accounts() {
  return (
    <div className={classes.Accounts}>
      <Navbar/>
      <AccountsDetails/>
      <Footer/>
     
    </div>
  );
}

export default Accounts;
