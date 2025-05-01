
let productsHtml = '' // Accumulating the results of the templated strings 
// for each product in the array create the html 
products.forEach((product) => {
    productsHtml += ` 
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                 src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)} 
            </div>

            <div class="product-quantity-container">
                <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
});

console.log(productsHtml);

document.querySelector('.js-products-grid').innerHTML = productsHtml

// list of all add to cart buttons
document.querySelectorAll('.js-add-to-cart').forEach((button, i) => {
    button.addEventListener('click', () => {
        //Data attribute 
        // console.log(button.dataset); // gets all the data attributes linked to the html element
        // console.log(button.dataset.productName); 

        const productId = button.dataset.productId;//  converts from kabab case to camel 

        // Compares the product id from the cart button to the existing cart and stores it in a var if found
        let matchingItem;
        cart.forEach((item) => {
            if (productId === item.productId){
                matchingItem = item
            }
        });

        // if the matching item was found, increase the quantity in cart, else add to cart 
        if (matchingItem) {
            matchingItem.quantity += 1;
        }else {
            cart.push({productId,
                quantity: 1
            })    
        }

        console.log(cart);
    })
});