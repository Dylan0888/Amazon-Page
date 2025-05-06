export let cart = JSON.parse(localStorage.getItem('cart')); // Allows cart to be used outside the file 

//default val if cart is empty 
if (!cart){
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}



export function addToCart(productId){ 
    // Compares the product id from the cart button to the existing cart and stores it in a var if found
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingItem = cartItem
        }
    });

    // if the matching item was found, increase the quantity in cart, else add to cart 
    if (matchingItem) {
        matchingItem.quantity += 1;
    }else {
        cart.push({productId,
            quantity: 1,
            deliveryOptionId: '1'

        });  
    }
    saveToStorage();
};

export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId){
            newCart.push(cartItem)
        }
    })
    cart = newCart;
    saveToStorage();
}

