let dummy_products = [];

function fetchData() {
  fetch("https://dummyjson.com/products/?limit=100")
    .then(response => {
      if (!response.ok) {
        throw Error('There is an error. You need to fix this!');
      }
      return response.json();
    })
    .then(data => {
      dummy_products = data.products; 
      displayProducts(dummy_products);
    })
    .catch(error => {
      console.error(error);
    });
}

function displayProducts(products) {
  const html = products.map(product => `
    <div class="products">
      <h3>${product.title}</h3>
      <p>Price: ${product.price}$</p>
      <p>Discount: ${product.discountPercentage}%</p>
      <p>Category: ${product.category}</p>
      <p>Stock: ${product.stock}</p>
      <img src="${product.thumbnail}" alt="Thumbnail" class="thumbnail">
      <button onclick="ToDetails(${product.id})" class="btn">More Details</button>
    </div>`
  ).join("");

  document.querySelector('#pr').innerHTML = html;
}

function ToDetails(productId) {
  window.location.href = `pr_details.html?productId=${productId}`;
}

const search = document.getElementById('search');
search.addEventListener('input', (e) => { 
  const searchStr = e.target.value.toLowerCase(); 
  const filteredProducts = dummy_products.filter(product => {
    return product.title.toLowerCase().includes(searchStr);
  });
  displayProducts(filteredProducts);
});

fetchData();
