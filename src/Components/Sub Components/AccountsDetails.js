import { clear } from '@testing-library/user-event/dist/clear';
import axios from 'axios';
import { useEffect, useState } from 'react';
import classes from '../../Styles/Sub Styles/AccountsDetails.module.scss';
import AddImage from '../Sub Components/AddImage'

const url = 'https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json ';

function AccountsDetails() {

  const [update, setUpdate] = useState('');
  const [account, setAccount] = useState('');
  const [accountType, setAccountType] = useState('Select account');
  const [accountData, setAccountData] = useState('');
  const [updatedData, setUpdatedData] = useState('');
  const [updatedAccount, setUpdatedAccount] = useState('');
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState('')
  const [info, setInfo] = useState('');



  // console.log(localStorage.getItem("accountType"))

  useEffect(() => {
    axios.get(url).then(response => {



      if (!localStorage.getItem("accountType")) {
        // console.log('true')       

        const jsonObj1 = JSON.stringify(Object.keys(response.data.accountsPage));
        const jsonObj2 = JSON.stringify(Object.values(response.data.accountsPage));
        localStorage.setItem("account", jsonObj1);
        localStorage.setItem("accountType", jsonObj2);
        const str1 = localStorage.getItem("account");
        const str2 = localStorage.getItem("accountType");
        const parsedObj1 = JSON.parse(str1);
        const parsedObj2 = JSON.parse(str2);
        setAccount(parsedObj1)
        setAccountData(parsedObj2)

      } else {
        const str1 = localStorage.getItem("account");
        const str2 = localStorage.getItem("accountType");
        const parsedObj1 = JSON.parse(str1);
        const parsedObj2 = JSON.parse(str2);
        setAccount(parsedObj1)
        setAccountData(parsedObj2)
        // console.log(parsedObj2)


      }
    })
  }, [])

  useEffect(() => {

    account && accountType != 'Select account' && account.map((acc, i) => {
      // console.log(acc,i)
      acc == accountType && setInfo(accountData[i])
    })
    account && accountType == 'Select account' && setInfo('')
    // console.log('w')
  }, [accountType, update])

  useEffect(() => {
    if (updatedData.profilePic && Object.keys(info.profilePic).length > 10  && imageUrl == '') {
      setImageUrl(URL.createObjectURL(updatedData.profilePic));
    }
    
    // info && console.log(Object.keys(info.profilePic).length)
    if (info && Object.keys(info.profilePic).length > 10 && imageUrl == '') {
      // account != '' && console.log(accountData)
      // setImageUrl(URL.createObjectURL(info.profilePic));
      // info.profilePic = URL.createObjectURL(info.profilePic);

    }

  }, [updatedData.profilePic, accountType]);


  useEffect(() => {
    Object.keys(info).map((key, i) => {
      Object.keys(updatedData).map((ukey, j) => {
        if (key == ukey) {
          setInfo({
            ...info, [ukey]: Object.values(updatedData)[j]
          })
        } 
        // else if(key == ukey && ukey == 'profilePic') {
        //   if(Object.keys(updatedData.profilePic).length > 0) {
            
        //     setInfo({
        //       ...info, [ukey]: updatedData.profilePic
        //     })
        //   } else {
        //     setInfo({
        //       ...info, [ukey]: Object.values(updatedData)[j]
        //     })

        //   }

        // }
      })
    })
  }, [updatedData])

  useEffect(() => {
    if (update == 'true') {
      // accountData.push(info)

      // console.log(accountData)
      account && account.map((type, i) => {
        if (type == accountType) {
          setAccountData(current => current.map((val, j) => {
            if (i == j) {

              return info
            } else {
              return val
            }
          }))
        }
      })
      setUpdate('false');
    }

    if (update == 'false') {
      const jsonObj2 = JSON.stringify(accountData);
      localStorage.setItem("accountType", jsonObj2);

    }

  }, [update])

  account && console.log(info, imageUrl)

  useEffect(() => {
    if (updatedAccount == 'true') {
      const jsonObj2 = JSON.stringify(accountData);
      localStorage.setItem("accountType", jsonObj2);

      const jsonObj1 = JSON.stringify(account);
      localStorage.setItem("account", jsonObj1);

      setUpdatedAccount('')
    }

  }, [updatedAccount])


  if (account != '') {

    var AccountType = (type) => {
      // console.log(type.value)
      setAccountType(type.value)
    }

    var submit = event => {
      event.preventDefault();
    };

    var AccountInfo = (key, value, img) => {
      // console.log(key, value)
      if (key == 'profilePic') {
        setUpdatedData({
          ...updatedData, [key]: img.files[0]
        })
      } else {
        setUpdatedData({
          ...updatedData, [key]: value
        })
      }
    }

    var UploadImage = () => {
      // console.log(image)
    }

    var UpdateAccount = () => {
      setUpdate('true');
      alert('Account Updated Successfully')
    }

    var DeleteAccount = () => {
      account && account.map((type, i) => {
        if (type == accountType) {
          setAccountData(current => current.filter((val, j) => {
            if (i != j) {
              return val
            }

          }))

          setAccount(current => current.filter((val, j) => {
            if (i != j) {
              return val
            }

          }))
        }
      })
      setUpdatedAccount('true')
      alert('Account Deleted Successfully')
    }
  }

  return (
    <div className={classes.AccountsDetails}>

      <div onChange={(e) => { AccountType(e.target) }}>

        <h2>List of Accounts</h2>
        <p>Accounts</p>
        <select>
          <option>Select account</option>
          {account && account.map((type) => {
            return <option>{type}</option>
          })}
        </select>
      </div>

      <form
        onSubmit={submit}
        onChange={(e) => { AccountInfo(e.target.name, e.target.value, e.target) }}
      >

        <div className={classes.left}>

          <p>Change Avatar</p>
          <img
            title={account != '' && info != '' ? info.profilePic == '' ? 'New Image' : accountType : 'Image Not available'}
            src={imageUrl != '' ? imageUrl : account != '' && info != '' ? info.profilePic == '' ? 'Not available' : info.profilePic : 'https://secure.gravatar.com/avatar/162f449adec6858c50e279ab862834ee?s=70&d=https%3A%2F%2Fwww.orbitmedia.com%2Fwp-content%2Fthemes%2Forbit-media%2Fimages%2Fno-image-speaker.jpg&r=g'}

          ></img>

          <button
            disabled={account != '' && accountType == 'Select account' ? true : false}
            style={account != '' && accountType == 'Select account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
            onClick={UploadImage}
          > <input
            type="file"
            name="profilePic"
            disabled={account != '' && accountType == 'Select account' ? true : false}
            style={account != '' && accountType == 'Select account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
          ></input></button>
        </div>

        <div className={classes.right}>

          <h2>Account Settings</h2>
          <div>

            <div>
              <p>Account Name</p>
              <input
                style={account != '' && accountType == 'Select account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
                disabled={account != '' && accountType == 'Select account' ? true : false}
                placeholder={accountType != 'Select account' ? '' : 'Select Account'}
                defaultValue={info != '' ? info.name != '' ? info.name : 'Not Available' : ''}
                type={'text'}
                name={'name'}
              // value={accountType != 'Select account' && ''}
              ></input>
            </div>

            <div>
              <p>Account Email</p>
              <input
                style={account != '' && accountType == 'Select account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
                disabled={account != '' && accountType == 'Select account' ? true : false}
                type={'email'}
                name={'email'}
                placeholder={accountType != 'Select account' ? '' : 'Select Account'}
                defaultValue={info != '' ? info.email != '' ? info.email : 'Not Available' : ''}
              ></input>
            </div>

            <div>
              <p>Password</p>
              <input
                style={account != '' && accountType == 'Select account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
                disabled={account != '' && accountType == 'Select account' ? true : false}
                type={'text'}
                name={'password'}
                placeholder={accountType != 'Select account' ? '' : 'Select Account'}
                defaultValue={info != '' ? info.password != '' ? info.password : 'Not Available' : ''}
              ></input>
            </div>

            <div>
              <p>Phone</p>
              <input
                style={account != '' && accountType == 'Select account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
                disabled={account != '' && accountType == 'Select account' ? true : false}
                type={'text'}
                name={'phone'}
                placeholder={accountType != 'Select account' ? '' : 'Select Account'}
                defaultValue={info != '' ? info.phone != '' ? info.phone : 'Not Available' : ''}
              ></input>
            </div>
            <button
              onClick={UpdateAccount}
              disabled={account != '' && updatedData == '' ? true : false}
              style={account != '' && accountType == 'Select account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
            >UPDATE YOUR PROFILE</button>
            <button
              onClick={DeleteAccount}
              disabled={account !== '' && accountType === 'Select account' ? true : false}
              style={account !== '' && accountType === 'Select account' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
            >DELETE YOUR ACCOUNT</button>
          </div>
        </div>
      </form>

    </div>
  );
}

export default AccountsDetails;
