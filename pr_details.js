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
        <p><span>Description:</span> ${productDetails.description}</p>
        <p><span>Price:</span> ${productDetails.price}$</p>
        <p><span>Rating:</span> ${productDetails.rating}</p>
        <p><span>Discount:</span> ${productDetails.discountPercentage}%</p>
        <p><span>Brand:</span> ${productDetails.brand}</p>
        <p><span>Category:</span> ${productDetails.category}</p>
        <p><span>Stock:</span> ${productDetails.stock}</p>
        <img src="${productDetails.thumbnail}" alt="Thumbnail" class="thumbnail">
        <div class="product-images">${imagesHtml}</div>
      `;
  
      document.querySelector('#productDetails').innerHTML = detailsHtml;
    }
  });
  