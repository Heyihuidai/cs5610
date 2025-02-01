// Price configuration
const prices = {
    // Flavors
    original: 2.5,
    mango: 3.0,
    strawberry: 3.5,
    // Sizes
    small: 1.0,
    medium: 1.5,
    large: 2.0,
    // Toppings
    boba: 0.5,
    jelly: 0.75,
    pudding: 1.0
};

function displayOrderSummary(order) {
    // Console logging for debugging
    console.log("=== Order Summary ===");
    console.log(`Flavor: ${order.flavor}`);
    console.log(`Size: ${order.size}`);
    console.log(`Toppings: ${order.toppings.join(', ') || 'None'}`);
    console.log(`Total Price: $${order.finalPrice.toFixed(2)}`);

    // Display in the UI
    const summaryDiv = document.getElementById('orderSummary');
    const summaryText = document.getElementById('summaryText');
    
    const toppingsText = order.toppings.length > 0 
        ? ` with ${order.toppings.join(', ')}` 
        : ' with no toppings';
    
    summaryText.innerHTML = `
        You ordered a ${order.size} ${order.flavor} bubble tea${toppingsText}.<br>
        Total Price: $${order.finalPrice.toFixed(2)}
    `;
    
    summaryDiv.style.display = 'block';
}

function placeOrder(flavor, size, toppings) {
    // Calculate base price (flavor + toppings)
    let basePrice = prices[flavor];
    
    // Add topping prices
    const toppingPrice = toppings.reduce((sum, topping) => sum + prices[topping], 0);
    basePrice += toppingPrice;
    
    // Multiply by size multiplier
    const finalPrice = basePrice * prices[size];
    
    // Create order object with selections and final price
    let order = {
        flavor: flavor,
        size: size,
        toppings: toppings,
        finalPrice: finalPrice
    };
    
    displayOrderSummary(order);
}

// Form submission handler
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const flavor = document.getElementById('flavor').value;
    const size = document.getElementById('size').value;
    const toppingsSelect = document.getElementById('toppings');
    const toppings = Array.from(toppingsSelect.selectedOptions).map(option => option.value);
    
    placeOrder(flavor, size, toppings);
});