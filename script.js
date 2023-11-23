function fetchData() {
    fetch('https://dummyjson.com/products')
      .then(response => {
        if (!response.ok) {
          throw Error('There is error. You need to fix this!');
        }
  
        return response.json();
      })
      .then(data => {
        console.log( data);
  
        if (data && data.products && Array.isArray(data.products)) {
          const html = data.products.map(product => {
            return `
            <div class="products">
            <h3>Title: ${product.title}</h3>
            <p>Price: ${product.price}$</p>
            <p>Discount: ${product.discountPercentage}%</p>
            <p>Category: ${product.category}</p>
            <p>Stock: ${product.stock}</p>
            <img src="${product.thumbnail}" alt="Thumbnail" class="thumbnail">
            </div>`;
          }).join("");
  
          document.querySelector('#pr').innerHTML = html;
        } else {
          console.error('Invalid data structure:', data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  fetchData();
  