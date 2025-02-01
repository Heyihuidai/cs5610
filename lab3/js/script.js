function displayOrderSummary(order) {
    console.log("=== Order Summary ===");
    console.log(`Flavor: ${order.flavor}`);
    console.log(`Size: ${order.size}`);
    console.log(`Toppings: ${order.toppings.join(', ') || 'None'}`);
}

function placeOrder(flavor, size, toppings) {
    // Create order object with selections
    let order = {
        flavor: flavor,
        size: size,
        toppings: toppings
    };
    
    displayOrderSummary(order);
}
