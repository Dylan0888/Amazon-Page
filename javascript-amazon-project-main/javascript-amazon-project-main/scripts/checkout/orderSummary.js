import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import { deliveryOptions } from '../../data/deliveryOptions.js';

// Log a sample delivery date (7 days from today) for reference/debugging
const today = dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary(){

    // Create HTML for each item in the cart
    let cartSummaryHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId; // Get product ID from the cart item

        let matchingProduct;
        // Find the corresponding product from the product list
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });

        // Get the delivery option selected for this cart item
        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;

        // Find the matching delivery option from the list
        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        });

        // Calculate the delivery date based on the delivery option
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        // Build the HTML for this cart item
        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img
                class="product-image"
                src="${matchingProduct.image}"
                />

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>

                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>

                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link"
                        data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
        `;
    });

    // Function to generate the delivery options radio buttons for each product
    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            // Calculate the delivery date for this option
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');

            // Format the price string (free or in dollars)
            const priceString = deliveryOption.priceCents === 0 
                ? 'Free'
                : `$${formatCurrency(deliveryOption.priceCents)} -`;

            // Determine if this option is selected
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            // Build HTML for a single radio button option
            html += `
                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                    <input
                        type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}"
                    />
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `;
        });

        return html;
    }

    // Render the cart summary HTML on the page
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    // Add click listeners to all "Delete" links in the cart
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            // Remove item from cart data
            removeFromCart(productId);

            // Remove the corresponding DOM element
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{

        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset; // gets from delivery options
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
        })

    });
}
