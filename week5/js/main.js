// Function to prompt user for the radius and update the radius display
function promptForRadius() {
    const input = prompt("Enter the radius of the circle:");
    const radius = parseFloat(input);
    if (isNaN(radius) || radius <= 0) {
        alert("Please enter a valid positive number.");
        return null;
    }
    // Update the radius display
    document.getElementById("radiusDisplay").textContent = `Radius: ${radius}`;
    return radius;
}

// Function to calculate the area and update the area display
function calculateArea(radius) {
    const area = Math.PI * radius * radius;
    // Display the area rounded to 2 decimal places
    document.getElementById("areaDisplay").textContent = `Area: ${area.toFixed(2)}`;
    return area;
}

// Function to start the calculation process
function startCalculation() {
    const radius = promptForRadius();
    if (radius !== null) {
        calculateArea(radius);
    }
}
