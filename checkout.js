let listCart = [];
// get cart data from cookie

function checkCart() {
    var cookieValue = document.cookie
    .split("; ")
    .find(row => row.startsWith("listCart="));
    if(cookieValue) {
        listCart = JSON.parse(cookieValue.split("=")[1]);
    }

}
checkCart();
addCartItemToHTML();

function addCartItemToHTML() {
    // clear data from HTML
    let listCartHTML = document.querySelector(".returnCart .list");
    listCartHTML.innerHTML = " ";

    let totalQuantityHTML = document.querySelector(".total-Quantity");
    let totalPriceHTML = document.querySelector(".totalPrice");

    let totalQuanity = 0;
    let totalPrice = 0;

    // if there is product in the cart
    if(listCart) {
        listCart.forEach(product => {
            if(product) {
                let newP = document.createElement("div");
                newP.classList.add("item");
                newP.innerHTML = 
                ` <img src="${product.image}">
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}</div>
                </div>
                <div class="quantity">${product.quantity}</div>
                <div class="returnPrice">$${product.price * product.quantity}</div>
                `;
                listCartHTML.appendChild(newP);
                totalQuanity = totalQuanity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity)
            }
        })
    }
    totalQuantityHTML.innerText = totalQuanity;
    totalPriceHTML.innerText = "$" + totalPrice.toLocaleString();
}