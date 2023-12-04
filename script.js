let dummy_products = [];
const maxProductsPerPage = 10;
let currentPaginationPage = 1;

const allproductsURL = "https://dummyjson.com/products/?limit=100";

function fetchData() {
  fetch(allproductsURL)
    .then(response => {
      if (!response.ok) {
        throw Error('There is an error. You need to fix this!');
      }
      return response.json();
    })
    .then(data => {
      dummy_products = data.products;
      displayProducts(dummy_products);
      displayPagination();
    })
    .catch(error => {
      console.error(error);
    });
}

function displayProducts(products) {
  const strIdx = (currentPaginationPage - 1) * maxProductsPerPage;
  const endIdx = strIdx + maxProductsPerPage;
  const displayedProducts = products.slice(strIdx, endIdx);

  const html = displayedProducts.map(product => `
    <div class="products">
      <h3>${product.title}</h3>
      <p><span>Price</span>: ${product.price}$</p>
      <p><span>Discount</span>: ${product.discountPercentage}%</p>
      <p><span>Category</span>: ${product.category}</p>
      <p><span>Stock</span>: ${product.stock}</p>
      <img src="${product.thumbnail}" alt="Thumbnail" class="thumbnail">
      <button onclick="ToDetails(${product.id})" class="btn">More Details</button>
    </div>`
  ).join("");

  document.querySelector('#pr').innerHTML = html;
}

function displayPagination() {
  const totalPaginationPages = Math.ceil(dummy_products.length / maxProductsPerPage);
  const paginationContainer = document.querySelector('#pagination');

  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPaginationPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.addEventListener('click', () => {
      currentPaginationPage = i;
      fetchData();
    });
    paginationContainer.appendChild(pageButton);
  }
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
