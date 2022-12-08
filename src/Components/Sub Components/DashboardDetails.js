import classes from '../../Styles/Sub Styles/DashboardDetails.module.scss'

import Chart from "react-apexcharts";
import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json ';

function DashboardDetails(props) {

  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios.get(url).then(response => {
      setInfo(response.data)
    })

  }, [])



  if (info != null) {

    var options = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: info.dasbhoardPage.latestHits.months
        }
      },
      series: [
        {
          name: "Popular",
          data: info.dasbhoardPage.latestHits.popular
        },
        {
          name: "Latest",
          data: info.dasbhoardPage.latestHits.latest
        },
        {
          name: "Featured",
          data: info.dasbhoardPage.latestHits.featured
        }
      ]
    };

    var optionsP = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: Object.keys(info.dasbhoardPage.performance)
        }
      },
      series: [
        {
          name: "Hits",
          data: Object.values(info.dasbhoardPage.performance)
        }
      ]
    };

    var optionsS = {
      options: {
        
        xaxis: {
          categories: Object.keys(info.dasbhoardPage.storage)}
      },
      series: Object.values(info.dasbhoardPage.storage)
    };

    var ValuesList = {
      val: info.dasbhoardPage.notifications

    }

    var Orders = {
      val: info.dasbhoardPage.orders
    }

    var bgColor = () => {
      console.log("w")
    }

    


    // console.log(info.dasbhoardPage.orders)
    var List = info.dasbhoardPage.notifications;


  }

  var tableHead = ['ORDER No.','STATUS','OPERATORS','LOCATION','DISTANCE','START DATE','EST DELIVERY DUE']




  return (
    <div className={classes.DashboardDetails}>

      <div>
        <div className={classes.LatestHits}>
          <h2>Latest Hits</h2>
          {info != null && <Chart
            options={options.options}
            series={options.series}
            type="bar"
            width="500"
          />}

        </div>
      </div>

      <div>
        <div className={classes.Performance}>
          <h2>Performance</h2>
          {info != null && <Chart
            options={optionsP.options}
            series={optionsP.series}
            type="bar"
            width="500"
          />}

        </div>
      </div>

      <div>

        <div className={classes.storageInfo}>
          <h2>Storage Information</h2>
          {info != null && <Chart
            options={optionsS.options}
            series={optionsS.series}
            // labels= {optionsS.labels}
            type="donut"
            width="500"
          />}

        </div>
      </div>

      <div className={classes.Notification}>
        <h2>Noticification List</h2>
        <div>
          {info != null && ValuesList.val.map((n, i) => {
            // { console.log(n.pic) }
            return <div>
              <img src={n.pic } id={'pic' + i} className={'pic' + i}></img>
              <div>
                <p>{n.message}</p>
                <p>{n.time}</p>
              </div>
            </div>
          })}


        </div>
      </div>

      <div className={classes.Products}>
        <h2>Orders List</h2>
        <table>
          <thead>
            <tr>
              {tableHead.map(t => {
                // console.log(t)
                return <td>{t}</td>
              })}
            </tr>
          </thead>
          <tbody>
              {info != null && Orders.val.map(o => {
                // console.log(o.orderNo)
                return<tr >
                  <td>#{o.orderNo}</td>
                  <td style={o.status == 'Delivered'?{'color': 'rgba(94, 202, 117)'}: o.status == 'Pending' ? {'color': 'rgb(195, 202, 94)'} : o.status == 'Cancelled' ?{'color':'rgb(202, 94, 94)'}:{'color':'rgb(130, 202, 94)'}}>{o.status}</td>
                  <td>{o.operators}</td>
                  <td>{o.location}</td>
                  <td>{o.distance} km</td>
                  <td>{o.startDate}</td>
                  <td>{o.deliveryDate}</td>
            </tr>
              })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DashboardDetails;
