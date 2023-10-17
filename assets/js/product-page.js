const queryString = decodeURI(window.location.search.slice(1));
const queries = queryString.split('&');
const queryPair = {};
queries.forEach(query => {
    const keyValuePair = query.split('=');
    queryPair[keyValuePair[0]] = keyValuePair[1];
})

const loadProduct = async (id) => {
    const product = await fetchProduct(id);
    const row = document.getElementById('row');
    row.innerHTML = `
                        <div class="col-lg-8">
                            <div class="left-images">
                                <img height="400rem" width="200rem"
                                    style="object-fit: contain" 
                                src=${product.image} alt="">
                                <!-- <img src="assets/images/single-product-02.jpg" alt=""> -->
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="right-content">
                                <h4>${product.title}</h4>
                                <span class="price">$${product.price}</span>
                                <span>${product.description}</span>
                              
                                
                              
                                <div class="total mt-4 d-grid  d-md-block">
                                    <div class="btn px-10 main-border-button"><a onclick="addToCart(${id}); window.location.href='cart.html'">Buy Now</a></div>
                                    <div class="btn px-10 main-border-button"><a onclick="addToCart(${id})">Add To Cart</a></div>
                                </div>
                            </div>
                        </div>
                    `
}

const fetchProduct = async (id) => {
    const res = await fetch(`${baseUrl}/products/${id}`);
    const data = await res.json();
    return await data;
}


const addToCart = (id) => {
    var cartItems = localStorage.getItem('cart-items');
    if(!cartItems) {
        cartItems = {};
    } else {
        cartItems = JSON.parse(cartItems);
    }

    cartItems[id] = 1;

    localStorage.setItem('cart-items', JSON.stringify(cartItems));
}

const baseUrl = 'https://fakestoreapi.com'
if(queryPair.id) {
    const id = queryPair.id;
    loadProduct(id);
} else {
    console.log("No or invalid product id found!");
}