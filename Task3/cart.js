const products = require('./data');

const cart = [];

function addToCart(product, quantity){

    const available = products.find(item => item.name === product);
    console.log(typeof(available))
    if (!available){
        console.log("Product not found")
    }else{
        if(quantity <= available.quantity){
            const inCartIndex = cart.findIndex(item => item.name === product);
            if (inCartIndex === -1){

                const productToAdd = { ...available, quantity: quantity }; // Create a shallow copy with adjusted quantity
                cart.push(productToAdd);
            }else{
                cart[inCartIndex].quantity += quantity
            }

            console.log("Cart:" , cart);
        }else{
            console.log("Not enough quantity")
        }

    }

}

function showCart(){
    return cart;
}

module.exports = {
    addToCart,
    showCart
}



// addToCart("Jeans", 3);
// addToCart("Jeans", 2);

