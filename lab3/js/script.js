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

function validateSelections() {
    const flavor = document.getElementById('flavor').value;
    const size = document.getElementById('size').value;

    if (!flavor || flavor === "") {
        alert("Please select a flavor.");
        return false;
    }
    if (!size || size === "") {
        alert("Please select a size.");
        return false;
    }
    return true;
}

function displayOrderSummary(order) {
    // Console logging for debugging
    console.log("=== Order Summary ===");
    console.log(`Flavor: ${order.flavor}`);
    console.log(`Size: ${order.size}`);
    console.log(`Toppings: ${order.toppings.join(', ') || 'None'}`);
    console.log(`Total Price: $${order.finalPrice.toFixed(2)}`);

    const summaryText = document.getElementById('summaryText');

    const toppingMessage = order.toppings.length > 0 
    ? `with these toppings: ${order.toppings.join(', ')}`
    : 'with no toppings';
    
    summaryText.innerHTML = `
        You have ordered a ${order.size} ${order.flavor} ${toppingMessage}.<br>
        Total Price: $${order.finalPrice.toFixed(2)}
    `;
}

function placeOrder() {
    if (!validateSelections()) {
        return;
    }
    
    // Get the values from the select elements.
    const flavor = document.getElementById('flavor').value;
    const size = document.getElementById('size').value;
    const toppingsSelect = document.getElementById('toppings');
    // Convert the selected options to an array and filter out any empty selections.
    const toppings = Array.from(toppingsSelect.selectedOptions)
                          .map(option => option.value)
                          .filter(value => value !== "");

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

// New Event Listener for the Button
document.getElementById('placeOrderButton').addEventListener('click', function(e) {
    e.preventDefault();
    placeOrder();
});