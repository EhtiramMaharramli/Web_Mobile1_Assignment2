document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
  
    if (productId) {
      fetchProductDetails(productId);
    } else {
      console.error('Product ID not found in the query parameters.');
    }
  
    function fetchProductDetails(productId) {
      const detailsUrl = `https://dummyjson.com/products/${productId}`;
      fetch(detailsUrl)
        .then(response => {
          if (!response.ok) {
            throw Error('There is an error fetching product details.');
          }
          return response.json();
        })
        .then(productDetails => {
          displayProductDetails(productDetails);
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    function displayProductDetails(productDetails) {
      const imagesHtml = productDetails.images.map(imageUrl => `<img src="${imageUrl}" alt="Product Image" class="product-image">`).join('');
  
      const detailsHtml = `
        <h2>${productDetails.title}</h2>
        <p>Description: ${productDetails.description}</p>
        <p>Price: ${productDetails.price}$</p>
        <p>Rating: ${productDetails.rating}</p>
        <p>Discount: ${productDetails.discountPercentage}%</p>
        <p>Brand: ${productDetails.brand}</p>
        <p>Category: ${productDetails.category}</p>
        <p>Stock: ${productDetails.stock}</p>
        <img src="${productDetails.thumbnail}" alt="Thumbnail" class="thumbnail">
        <div class="product-images">${imagesHtml}</div>
      `;
  
      document.querySelector('#productDetails').innerHTML = detailsHtml;
    }
  });
  