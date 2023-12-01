function fetchData() {
  
  fetch("https://dummyjson.com/products/?limit=100")
    .then(response => {
      if (!response.ok) {
        throw Error('There is error. You need to fix this!');
      }

      return response.json();
    })
    .then(data => {
      console.log(data);

      if (data && data.products && Array.isArray(data.products)) {
        displayProducts(data.products);
      } else {
        console.error('Invalid data structure:', data);
      }
    })
    .catch(error => {
      console.error(error);
    });
}


function displayProducts(products) {
  const html = products.map(product => `
    <div class="products">
      <h3>Title: ${product.title}</h3>
      <p>Price: ${product.price}$</p>
      <p>Discount: ${product.discountPercentage}%</p>
      <p>Category: ${product.category}</p>
      <p>Stock: ${product.stock}</p>
      <img src="${product.thumbnail}" alt="Thumbnail" class="thumbnail">
    </div>`
  ).join("");

  document.querySelector('#pr').innerHTML = html;
}




fetchData();
