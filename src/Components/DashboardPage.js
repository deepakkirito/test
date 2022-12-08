import classes from '../Styles/DashboardPage.module.scss';
import Navbar from './Sub Components/Navbar';
import Footer from './Sub Components/Footer';
import DashboardDetails from './Sub Components/DashboardDetails';

import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {

  // const url = 'https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json ';
  // const [info, setInfo] = useState('');
  
  // useEffect (() => {

  //   axios.get(url).then(response => {

  //     setInfo(response.data)
  //   })
  // },[])

  // console.log(info)

  return (
    <div className={classes.Dashboard}>
     <Navbar />
     <DashboardDetails />
     <Footer />
    </div>
  );
}

export default Dashboard;
