let iconCart = document.querySelector(".iconCart");
let cart = document.querySelector(".cart");
let container = document.querySelector(".container");
let close = document.querySelector(".close");

iconCart.addEventListener("click", (event)=> {
    
    // Prevent the default behavior of the anchor link
    event.preventDefault();

    if(cart.style.right === "-100%" || cart.style.right === " ") {
        cart.style.right = "0px";
        cart.style.height = "100vh"
        container.style.transform = "translateX(0px)";
    } else {
        cart.style.right = "-100%";
        container.style.transform = "translateX(0)"
    }
})

close.addEventListener("click", ()=> {
    cart.style.right = "-100%";
    container.style.transform = "translateX(0)"
})


let products = null;

// get data from file json
fetch("product.json")
    .then(response => response.json())
    .then(data =>{
        products = data;
    addDataToHTML();
})

// show datas product in list 
function addDataToHTML(){
    //remove data default from HTML
    let listProductHTML = document.querySelector(".listProduct");
    listProductHTML.innerHTML = "";

    // add new datas
    if(products != null) {
        products.forEach(product => {
            let newItem = document.createElement("div");
            newItem.classList.add("item");
            newItem.innerHTML =
            `<a href="product.html?id=${product.id}">
                <img src="${product.image}">
            </a>
            <h2 class="name">${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button onclick="addCart(${product.id})">Add To Cart</button>
            `
            listProductHTML.appendChild(newItem)
        });
   }
}
// use cookie so the cart doesnt get lost on refresh page

let listCart = [];

function checkCart() {
    var cookieValue = document.cookie
    .split("; ")
    .find(row => row.startsWith("listCart"));
    if(cookieValue) {
        listCart = JSON.parse(cookieValue.split("=")[1]);   
    } else {
        listCart = [];
    }
}
checkCart();

function addCart($idProduct) {
    let productsCopy = JSON.parse(JSON.stringify(products));
    // if this product is not in the cart
    if(!listCart[$idProduct]){

        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    } else {
        // if the product is already in the cart increase the quantity
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    
    addCartItemToHTML();
}

addCartItemToHTML();

function addCartItemToHTML() {
    // clear data default
    let listCartHTML = document.querySelector(".listcart");
    listCartHTML.innerHTML = " ";

    let totalHTML = document.querySelector(".totalQuantity");
    let totalQuantity = 0

    // if there is product in Cart
    if(listCart && listCart.length > 0){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement("div");
                newCart.classList.add("item");
                newCart.innerHTML = 
                ` <img src="${product.image}" alt="">
                <div class="content">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}</div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </div>
                `
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;

    // Toggle visibility of totalQuantity based on the total quantity in the cart
    if (totalQuantity > 0) {
        totalHTML.style.display = "flex";
    } else {
        listCartHTML.innerHTML = "<p>Your cart is empty.<br> Shop to add items to your cart.</p>";
        totalHTML.style.display = "none";
    }
    
}

 

function changeQuantity($idproduct, $type){
    switch($type){
        case "+":
            listCart[$idproduct].quantity++;
            break;
        case "-":
            listCart[$idproduct].quantity--;
            // if quantity is less than or equal to zero remove product in cart
            if(listCart[$idproduct].quantity <= 0) {
                delete listCart[$idproduct];
                
            }
            break;

        default:
            break;    
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartItemToHTML()
}