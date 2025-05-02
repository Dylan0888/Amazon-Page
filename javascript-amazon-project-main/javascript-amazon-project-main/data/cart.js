export const cart = []; // Allows cart to be used outside the file 

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
            quantity: 1
        });  
    }
};
