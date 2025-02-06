// Global array to store shopping items
let shoppingItems = ["bread", "cheese", "green pepper"];

// Function to display items
function displayItems() {
    const ul = document.querySelector('.shopping');
    // Clear existing items
    ul.innerHTML = '';
    // Add each item to the list
    shoppingItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        if (item.toLowerCase().includes('green')) {
            li.style.color = 'green';
        }
        ul.appendChild(li);
    });
}

// Function to add new item
function addItem() {
    const input = document.getElementById('newItem');
    const newItem = input.value.trim();
    
    if (newItem !== '') {
        shoppingItems.push(newItem);
        displayItems();
        input.value = '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add square styling to list
    const ul = document.querySelector('.shopping');
    ul.classList.add('squareList');
    
    // Display initial items
    displayItems();
    
    // Add Enter key listener
    document.getElementById('newItem').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });
});