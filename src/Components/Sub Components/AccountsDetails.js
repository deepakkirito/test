import { clear } from '@testing-library/user-event/dist/clear';
import axios from 'axios';
import { useEffect, useState } from 'react';
import classes from '../../Styles/Sub Styles/AccountsDetails.module.scss';

const url = 'https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json ';

function AccountsDetails() {

  // clear()

  const [info, setInfo] = useState('');
  var [Updateinfo, setUpdateinfo] = useState({
    // 'profilePic': 'https://secure.gravatar.com/avatar/162f449adec6858c50e279ab862834ee?s=70&d=https%3A%2F%2Fwww.orbitmedia.com%2Fwp-content%2Fthemes%2Forbit-media%2Fimages%2Fno-image-speaker.jpg&r=g',
    // 'name': 'Select Account',
    // 'email': 'Select Account',
    // 'password': 'Select Account',
    // 'phone': 'Select Account'
  });

  useEffect(() => {

    axios.get(url).then(response => {

      setInfo(response.data.accountsPage)
      // console.log(response.data)
    }).catch((err) => {
      // console.log(err)
    })

  }, [])

  const [test, setTest] = useState({
    val: {
      profilePic: 'https://secure.gravatar.com/avatar/162f449adec6858c50e279ab862834ee?s=70&d=https%3A%2F%2Fwww.orbitmedia.com%2Fwp-content%2Fthemes%2Forbit-media%2Fimages%2Fno-image-speaker.jpg&r=g',
      name: 'Select Account',
      email: 'Select Account',
      password: 'Select Account',
      phone: 'Select Account'
    },
    accounttype: window.localStorage.getItem('account type')
  });

  // window.localStorage.setItem('info', test)
  // console.log(Object.values(window.localStorage.getItem('info')))

  if (info != null) {

    // console.log(info);

    var AccountType = (e) => {

      // console.log(e.target.value)

      var ctr = 0;

      Object.keys(info).map((a, i) => {


        if (e.target.value == a) {

          ctr++;
          console.log(Object.values(info)[i]);
          window.localStorage.setItem('account type', Object.values(info)[i])

          setTest({
            val: Object.values(info)[i],
            // accounttype: window.localStorage.getItem('account type')
          }
          );

        } if (ctr == 0) {

          setTest({
            val: {
              profilePic: 'https://secure.gravatar.com/avatar/162f449adec6858c50e279ab862834ee?s=70&d=https%3A%2F%2Fwww.orbitmedia.com%2Fwp-content%2Fthemes%2Forbit-media%2Fimages%2Fno-image-speaker.jpg&r=g',
              name: 'Select Account',
              email: 'Select Account',
              password: 'Select Account',
              phone: 'Select Account'
            }
          })
        }
      })
    }

    // console.log(test.val.profilePic)

    // var UpdateInfo = {}


    var Data = (values) => {
      // console.log(values.value)
      // setTest
      // console.log(values.name)
      // console.log(Updateinfo)
    }

    var Update = () => {

      console.log(window.localStorage.getItem('name'))
      // console.log(test)

      setUpdateinfo({
        val: {
          'name': window.localStorage.getItem('name'),
          'email': window.localStorage.getItem('email'),
          'password': window.localStorage.getItem('password'),
          'phone': window.localStorage.getItem('phone')
        }
      })

    }
    console.log(Updateinfo)

    var Updatevalue = (values) => {

      // console.log(val.value)

      // setUpdateinfo({
      //   'name': values.name == 'name' && values.value,
      //   'email': values.name == 'email' && values.value,
      //   'password': values.name == 'password' && values.value,
      //   'phone': values.name == 'phone' && values.value
      // })

      window.localStorage.setItem('name', values.name == 'name' && values.value != false ? values.value : window.localStorage.getItem('name'))
      window.localStorage.setItem('email', values.name == 'email' && values.value != false ? values.value : window.localStorage.getItem('email'))
      window.localStorage.setItem('password', values.name == 'password' && values.value != false ? values.value : window.localStorage.getItem('password'))
      window.localStorage.setItem('phone', values.name == 'phone' && values.value != false ? values.value : window.localStorage.getItem('phone'))

    }


    var submit = event => {

      // console.log(Updateinfo)
      event.preventDefault();
      console.log('form submitted ✅');
    };
  }

  return (
    <div className={classes.AccountsDetails}>

      <div>

        <h2>List of Accounts</h2>
        <p>Accounts</p>
        <select onClick={AccountType}>
          <option>Select account</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>Merchant</option>
          <option>Customer</option>
        </select>

      </div>

      <form onSubmit={submit} onChange={(e) => { Data(e.target) }}>

        <div className={classes.left}>

          <p>Change Avatar</p>
          <img title='Image Not Available' src={info != null ? test.val.profilePic : 'https://secure.gravatar.com/avatar/162f449adec6858c50e279ab862834ee?s=70&d=https%3A%2F%2Fwww.orbitmedia.com%2Fwp-content%2Fthemes%2Forbit-media%2Fimages%2Fno-image-speaker.jpg&r=g'}></img>
          <button
            disabled={info != null && test.val.name == 'Select Account'}
            style={info != null && test.val.name == 'Select Account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
          >UPLOAD NEW PHOTO</button>
        </div>

        <div className={classes.right}>

          <h2>Account Settings</h2>
          <div>
            <div>

              <p>Account Name</p>
              <input
                type={'text'}
                name={'name'}
                onChange={e => { Updatevalue(e.target) }}
                defaultValue={info != null ? test.val.name : 'Select Account'}
                disabled={info != null && test.val.name == 'Select Account'}
                style={info != null && test.val.name == 'Select Account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
              ></input>
              {/* {console.log(info != null ? test.val.name : 'Select Account')} */}

            </div>

            <div>

              <p>Account Email</p>
              <input
                type={'email'}
                name={'email'}
                onChange={e => { Updatevalue(e.target) }}
                defaultValue={info != null ? test.val.email : 'Select Account'}
                disabled={info != null && test.val.name == 'Select Account'}
                style={info != null && test.val.name == 'Select Account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
              ></input>
            </div>

            <div>

              <p>Password</p>
              <input
                type={'text'}
                name={'password'}
                onChange={e => { Updatevalue(e.target) }}
                defaultValue={info != null ? test.val.password : 'Select Account'}
                disabled={info != null && test.val.name == 'Select Account'}
                style={info != null && test.val.name == 'Select Account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
              ></input>
            </div>

            <div>

              <p>Phone</p>
              {/* {console.log(info != null ? test.val.name == '' ? 'Not Available' : test.val.name : 'Select Account')} */}
              <input
                type={'text'}
                name={'phone'}
                onChange={e => { Updatevalue(e.target) }}
                defaultValue={info != null ? test.val.phone == '' ? 'Not Available' : test.val.phone : 'Select Account'}
                disabled={info != null && test.val.name == 'Select Account'}
                style={info != null && test.val.name == 'Select Account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
              ></input>
            </div>
            {/* {console.log(Updateinfo.name == 'Select Account')} */}
            {console.log(test.val.name)}
            <button
              disabled={info != null && test.val.name == 'Select Account'}
              style={info != null && test.val.name == 'Select Account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
              onClick={Update}>UPDATE YOUR PROFILE</button>
            <button
              disabled={info != null && test.val.name == 'Select Account'}
              style={info != null && test.val.name == 'Select Account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
            >DELETE YOUR ACCOUNT</button>
            {/* console.log(info != null && test.val.name == 'Select Account' &&  'cursor': 'not-allowed'  ||  'cursor': 'pointer' ) */}

          </div>
        </div>
      </form>

    </div>
  );
}

export default AccountsDetails;
