import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../../Styles/Sub Styles/ProductDetails.module.scss';
import { createContext } from 'react';
import contextData from '../contextarray';
// import deletePic from '../delete.png'

const url = 'https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json ';
const urlP = 'https://x4ko9ujlnc.api.quickmocker.com/products';
const urlC = 'https://x4ko9ujlnc.api.quickmocker.com/categories';

function ProductDetails() {

  const [product, setProduct] = useState('');
  const [info, setInfo] = useState('');
  const [categories, setCategories] = useState('');
  const [categoriesNew, setCategoriesNew] = useState('');
  const [deleteProduct, setDeleteProduct] = useState('');
  const NewProduct = useContext(contextData);

  // console.log(NewProduct);

  var productsHead = [
    'PRODUCT NAME',
    'UNIT SOLD',
    'IN STOCK',
    'EXPIRE DATE'
  ]

  useEffect(() => {
    axios.get(url).then(response => {
      setInfo(response.data.productsPage);
      setProduct(response.data.productsPage.products);
      setCategories(response.data.productsPage.categories);
    })


    // axios.get(urlC).then(response => {
    //   // setInfo(response.data)
    //   // console.log(response)
    // })

    // axios.get(urlP).then(response => {
    //   // setInfo(response.data)
    //   // console.log(response)
    // })

    // axios.post(urlC, {
    //   'product' : info,
    //   'categories' : categories
    // }).then(response => {
    //   setInfo(response.data)
    //   setProduct(response.data.product)
    //   setCategories(response.data.categories.categories)
    //   console.log('w')
    // })

  }, []);

  useEffect(() => {

    // categories.push(categoriesNew)

    // setCategories(
    //   categories
    // )
    if (categoriesNew != '') {
      // console.log(categories, categoriesNew)
      categories.push(categoriesNew)
      console.log(categories, categoriesNew)
      setCategories(categories)
      setCategoriesNew('')
      
    }
    
  }, [categoriesNew, categories])




  console.log(product, categories);


  if (product != '') {


    var imgDelete = (delPname) => {

      setProduct(current => current.filter(val => {

        // console.log(val.name);
        return val.name != delPname.id

      }))

      // axios.post(urlP, {
      //   'products' : current => current.filter(val => {

      //     // console.log(val.name);
      //     return val.name != delPname.id

      //   })
      // }).then(response => {
      //   console.log(response.data)
      // })
    }

    var tableCheck = (key, value) => {

      setDeleteProduct({
        ...deleteProduct, [key]: value
      });

    }

    var multipleDelete = () => {

      // console.log(deleteProduct);
      Object.values(deleteProduct).map((D, i) => {
        D && setProduct(current => current.filter(P => {
          return P.name != Object.keys(deleteProduct)[i]
        }))
      })

      setDeleteProduct('')
    }

    var delCategory = (dCat) => {

      setCategories(current => current.filter(c => {
        return c != dCat
      }))
    }

    var newCategory = () => {

      // setcategoriesNew(prompt('Enter New Category'))
      // setCategoriesNew(categoriesNew)
      setCategoriesNew(prompt('Enter New Category'))
      // if (categoriesNew == '') {

      // } else {
      // }

      // setCategories([prompt('Enter New Category')])

      // console.log(categories);
    }

    if (window.localStorage.getItem('pN') != '') {

      console.log(window.localStorage.getItem('pN'))
      let data = {
        name: window.localStorage.getItem('pN'),
        unitSold: 0,
        stock: window.localStorage.getItem('uS'),
        expireDate: window.localStorage.getItem('eD'),
        description: window.localStorage.getItem('desc'),
        category: window.localStorage.getItem('cat')
      }
      product.push(data)
      // console.log(product)
      // setProduct(product)
      window.localStorage.setItem('uS', '')
      window.localStorage.setItem('pN', '')
      window.localStorage.setItem('desc', '')
      window.localStorage.setItem('cat', '')
      window.localStorage.setItem('eD', '')

    }

    console.log(categoriesNew)


  }




  return (
    <div className={classes.ProductDetails}>
      <div className={classes.left}>
        <div>
          {
            product == '' && <p

            >
              No products to show
            </p>
          }
          {product != '' && <table>
            <thead>
              <tr>
                <td></td>
                {productsHead.map(h => {
                  return <td>{h}</td>
                })}
                <td></td>
              </tr>
            </thead>
            <tbody
              onChange={(e) => { tableCheck(e.target.id, e.target.checked) }}
            >
              {product && product.map((p) => {
                return <tr>
                  <td><input defaultValue={deleteProduct == '' && 'off'} id={p.name} type={'checkbox'}></input></td>
                  <td><label htmlFor={p.name}>{p.name}</label></td>
                  <td><label htmlFor={p.name}>{p.unitSold}</label></td>
                  <td><label htmlFor={p.name}>{p.stock}</label></td>
                  <td><label htmlFor={p.name}>{p.expireDate}</label></td>
                  <img
                    id={p.name}
                    onClick={(e) => imgDelete(e.target)}
                    title='Delete Product'
                    src='https://w7.pngwing.com/pngs/56/35/png-transparent-computer-icons-delete-button-miscellaneous-text-rectangle-thumbnail.png'
                  ></img>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
        <button><Link
          to='/Addproduct'
        >ADD NEW PRODUCT</Link></button>
        <button
          onClick={multipleDelete}
          disabled={product == null || product == ''}
          style={product == null || product == '' ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
        >DELETE SELECTED PRODUCT</button>

      </div>
      <div className={classes.right}>
        <h2>Product Categories</h2>
        <div>
          {categories!='' && categories.map(c => {
            return <div className={classes.categoryBar}>
              {console.log(categories)}
              <p>{c}</p>
              {/* {categoriesNew != '' && categoriesNew.map(cat => {
                return <p>{cat}</p>
              })} */}
              <img id={c} onClick={(e) => delCategory(e.target.id)} src='https://w7.pngwing.com/pngs/56/35/png-transparent-computer-icons-delete-button-miscellaneous-text-rectangle-thumbnail.png'></img>
            </div>
          })}
          <button
            onClick={newCategory}
          >ADD NEW CATEGORY</button>
        </div>
      </div>

    </div>
  );
}

export default ProductDetails;
