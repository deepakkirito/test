import axios from 'axios';
import { useEffect, useState } from 'react';
import classes from '../Styles/AddNewProductPage.module.scss';
import Footer from './Sub Components/Footer';
import Navbar from './Sub Components/Navbar';
import { Link } from 'react-router-dom';
import contextData from './contextarray';

const url = 'https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json';
const urlP = 'https://x4ko9ujlnc.api.quickmocker.com/products';
const urlC = 'https://x4ko9ujlnc.api.quickmocker.com/categories';

function AddProduct() {

  const [data, setData] = useState({})
  const [product, setProduct] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [categories, setCategories] = useState('');

  useEffect(() => {
    if (product.pI) {
      setImageUrl(URL.createObjectURL(product.pI));
    }
  }, [product.pI]);

  useEffect(() => {
    axios.get(url).then(response => {
      setCategories(response.data.productsPage.categories);
    })

    axios.post(urlP, {
      newP : product
    }).then(response => {
      setData(response.data);
    })

  }, []);

  console.log(data)

  const productDetails = (key, value, test) => {

    if (key == 'pI') {
      setProduct({
        [key]: test.files[0]
      })
    } else {
      setProduct({
        ...product, [key]: value
      })
    }
  }

  const productAdded = () => {



  }

  const submit = event => {
    event.preventDefault();
  }

  console.log(product.length)

  return (
    <div className={classes.AddProduct}>
      <contextData value={
        'product'
      }>
        <Navbar />
        <form onSubmit={submit} onChange={e => productDetails(e.target.id, e.target.value, e.target)} >
          <div>
            <div className={classes.left}>
              <h2>Add Product</h2>
              <div>
                <p>Product Name</p>
                <input id='pN' type={'text'}></input>
              </div>
              <div>
                <p>Description</p>
                <textarea id='desc'></textarea>
              </div>
              <div>
                <p>Category</p>
                <select id='cat'>
                  <option>Select category</option>
                  {categories != '' && categories.map(c => {
                    return <option>{c}</option>
                  })}
                </select>
              </div>
              <div>
                <div>
                  <p>Expire Date</p>
                  <input id='eD' type={'date'}></input>
                </div>
                <div>
                  <p>Units in Stock</p>
                  <input id='uS' type={'number'}></input>
                </div>
              </div>
            </div>
            <div className={classes.right}>
              {/* {console.log(Iprod)} */}
              <div>
                <img
                  src={imageUrl ? imageUrl : 'https://members.hpd-collaborative.org/global_graphics/default-store-350x350.jpg'}
                ></img>
                <input
                  id='pI'
                  style={{
                    'color': 'whitesmoke',
                    'cursor': 'pointer'
                  }}
                  size={'1MB'}
                  type={'file'}
                  accept="image/png, image/jpeg, image/bmp, image/svg, image/webp"
                ></input>
              </div>
            </div>
          </div>
        </form>
        <button disabled={product.length <= 5 ? 'true' : 'false'} onClick={productAdded} className={classes.Addbutton}>
          <Link to='/Products' style={{ 'textDecoration': 'none', 'color': 'whitesmoke' }}>ADD PRODUCT NOW</Link>
        </button>
        <Footer />
      </contextData>

    </div>
  );
}

export default AddProduct;
