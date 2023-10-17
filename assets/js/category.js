let grid = document.querySelector(".products");
let filterInput = document.getElementById("filterInput");

const queryString = decodeURI(window.location.search.slice(1));
const queries = queryString.split('&');
const queryPair = {};
queries.forEach(query => {
    const keyValuePair = query.split('=');
    queryPair[keyValuePair[0]] = keyValuePair[1];
})

const baseUrl = 'https://fakestoreapi.com'
if(queryPair.category) {
    const category = queryPair.category;
    document.getElementById('category-name').innerHTML = category[0].toUpperCase() + category.slice(1);
    fetch(`${baseUrl}/products/category/${category}`)
    .then(res => res.json())
    .then(json => {        
        for (let value of json){
            addElement(grid, value)
        }        
    });
} else {
    console.error('Category doesn\'t exist in query string');
}



filterInput.addEventListener('keyup', filterProducts);

 
function filterProducts(){
    let filterValue = filterInput.value.toUpperCase();
    let item = grid.querySelectorAll('.item');

    for (let i = 0; i < item.length; i++){
        let span = item[i].querySelector('.title');

        if(span.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            item[i].style.display = "initial";
        }else{
            item[i].style.display = "none";
        }

    }
}

function addElement(appendIn, value){
    let div = document.createElement('div');
    div.className = "item justify-self-center";

    let {id, image, title, category, price } = value;

    div.innerHTML = `
            <a href="product.html?id=${id}"><img src="${image}" class="bg-cover img mx-auto" alt="img1"></a>
            <div class="py-3 font-poppins">
                <h8 class="text-md title">${title.slice(0, 25)}...</h8>
                <span class="block py-3 font-semibold text-md">$<span class="">${price}</span></span>
                <div class="flex-auto flex space-x-3">
                  <button class="
                      p-2
                      w-1/2
                      flex
                      items-center
                      justify-center
                      rounded-md
                      bg-black
                      text-white
                    " 
                    type="submit"
                    onclick="addToCart(${id}); window.location.href='cart.html'"
                   >
                    Buy now
                  </button>
                  <button class="
                      p-2
                      w-1/2
                      flex
                      items-center
                      justify-center
                      rounded-md
                      border border-gray-300
                      hover:bg-gray-300
                    " 
                    type="button"
                    onclick="addToCart(${id})"
                   >
                    Add to bag
                  </button>
                </div>
            </div>
    `;
    appendIn.appendChild(div);
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
