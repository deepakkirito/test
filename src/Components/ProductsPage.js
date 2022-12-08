import axios from 'axios';
import { useEffect, useState } from 'react';
import classes from '../Styles/ProductsPage.module.scss';
import Footer from './Sub Components/Footer';
import Navbar from './Sub Components/Navbar';
import ProductDetails from './Sub Components/ProductDetails';


function Products() {




  return (
    <div className={classes.Products}>
      <Navbar />
      <ProductDetails />
      <Footer />
     
    </div>
  );
}

export default Products;
