import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
        const sortedProducts = Object.values(response.data.products).sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity));
        console.log(sortedProducts)
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Product Listing</h1>
      <table>
        <thead>
          <tr>
            <th>Subcategory</th>
            <th>Title</th>
            <th>Price</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, productId) => {
            return (
              <tr key={productId}>
                <td>{product.subcategory}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.popularity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
