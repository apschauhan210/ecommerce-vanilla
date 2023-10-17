var totalPrice = 0;

const loadTable = async () => {
    totalPrice = 0;
    const cartItemsString = localStorage.getItem('cart-items');
    if (cartItemsString) {
        const baseUrl = "https://fakestoreapi.com"
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = ''
        const cartItems = JSON.parse(cartItemsString);
        var count = 0;
        for(const itemId in cartItems) {
            count++;
            const item = await fetch(`${baseUrl}/products/${itemId}`)
                            .then(res => res.json())
                            .then(json => json);      
        
            const tr = document.createElement('tr');
            tr.innerHTML = `
                                <td class="product-thumbnail">
                                    <img src=${item.image} alt="Image" class="bg-cover img mx-auto">
                                </td>
                                <td class="product-name">
                                    <h2 class="h5 text-black">${item.title.slice(0, 20)}...</h2>
                                </td>
                                <td>${item.price}</td>
                                <td>
                                    <div class="input-group mb-3 d-flex align-items-center quantity-container"
                                        style="max-width: 120px;">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-outline-black decrease"
                                                onclick="decrease(${item.id}, ${item.price})"
                                                type="button">&minus;</button>
                                        </div>
                                        <input id='quantity${item.id}' type="text" class="form-control text-center quantity-amount"
                                            value=${cartItems[itemId]} placeholder="" aria-label="Example text with button addon"
                                            aria-describedby="button-addon1">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-black increase"
                                                onclick="increase(${item.id}, ${item.price})"
                                                type="button">&plus;</button>
                                        </div>
                                    </div>

                                </td>
                                <td id='total${itemId}'>${Math.round((cartItems[itemId] * item.price) * 100) / 100}</td>
                                <td><button onclick="deleteItem(${itemId}, ${item.price})" class="btn btn-black btn-sm">X</button></td>
                        `
            tbody.appendChild(tr);
            totalPrice += Math.round((cartItems[itemId] * item.price) * 100) / 100;
        }
        document.getElementById('subtotal').innerHTML='$' + Math.round(totalPrice * 100) / 100;
        document.getElementById('total').innerHTML='$' + Math.round(totalPrice * 100) / 100;
        if(count === 0) {
            const container = document.getElementById('container');
            container.innerHTML = `
                                    <h1 class="m-2 py-4">Your cart is empty!</h1>
                                `
        }
    } else {
        const container = document.getElementById('container');
        container.innerHTML = `
                                <h1 class="m-2 py-4">Your cart is empty!</h1>
                            `
    }
}

loadTable();

const increase = (itemId, price) => {
    const inp = document.getElementById('quantity' + itemId);
    inp.value = Number.parseInt(inp.value) + 1;
    const cartItems = JSON.parse(localStorage.getItem('cart-items'));
    cartItems[itemId] = inp.value;
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
    document.getElementById('total' + itemId).innerHTML = Math.round((cartItems[itemId] * price) * 100) / 100;
    totalPrice += price;
    document.getElementById('subtotal').innerHTML='$' + Math.round(totalPrice * 100) / 100;
    document.getElementById('total').innerHTML='$' + Math.round(totalPrice * 100) / 100;
}

const decrease = (itemId, price) => {
    const inp = document.getElementById('quantity' + itemId);
    inp.value = Number.parseInt(inp.value) - 1;
    const cartItems = JSON.parse(localStorage.getItem('cart-items'));
    totalPrice -= price;
    if(Number.parseInt(inp.value) === 0) {
        delete cartItems[itemId];
        localStorage.setItem('cart-items', JSON.stringify(cartItems));
        loadTable();    
        return;
    }
    cartItems[itemId] = inp.value;
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
    document.getElementById('total' + itemId).innerHTML = Math.round((cartItems[itemId] * price) * 100) / 100;
    
    document.getElementById('subtotal').innerHTML='$' + Math.round(totalPrice * 100) / 100;
    document.getElementById('total').innerHTML='$' + Math.round(totalPrice * 100) / 100;
}

const deleteItem = (itemId, price) => {
    const cartItems = JSON.parse(localStorage.getItem('cart-items'));
    delete cartItems[itemId];
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
    totalPrice -= cartItems[itemId] * price;
    loadTable();    
}


var options = {
    "key": "rzp_test_Pp0o7b7hjUPGZU", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "HEXASHOP", //your business name
    "description": "Test Transaction",
    "image": "assets/images/logo.png",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        localStorage.removeItem('cart-items');
        loadTable();
        alert("Your order was successfull!");
        window.location.href = 'index.html';
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "John Wick", //your customer's name
        "email": "johnwick@continental.com", 
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Continental@NewYorkCity"
    },
    "theme": {
        "color": "#3399cc"
    }
};

document.getElementById('rzp-button1').onclick = function(e){
    options.amount = Math.round((totalPrice * 100) * 100) / 100;
    console.log(options.amount);
    options.currency = 'INR';
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
}