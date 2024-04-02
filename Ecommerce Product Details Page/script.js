const addToCartButton = document.getElementById("add-to-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = [];
let total = 0;

addToCartButton.addEventListener("click", () => {
    // Add the product to the cart array
    cart.push({ name: "APPLE iPhone 12 (Blue , 64 GB)", price: 684.75 });
    
    // Update the cart display
    displayCart();
});

function displayCart() {
    cartItemsList.innerHTML = "";
    total = 0;
    
    cart.forEach(item => {
        const li = document.createElement("li");
        const priceInRupee = (item.price * 83.24).toFixed(2);
        li.innerHTML = `${item.name} - &#x20B9;${priceInRupee}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });
    
    const totalInRupee = (total * 83.24).toFixed(2);
    cartTotal.innerHTML = `${totalInRupee}`;

    
}
