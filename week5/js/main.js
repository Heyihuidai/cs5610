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

// Get button text from localStorage with default value
const getButtonText = () => {
    const defaultText = "Click Me!";
    try {
        const savedText = localStorage.getItem("buttontext");
        return savedText || defaultText;
    } catch (error) {
        console.error("Error accessing localStorage:", error);
        return defaultText;
    }
};

// Toggle button text function with localStorage
function toggleButtonText(event) {
    const button = event.target;
    const newText = button.textContent === 'Click Me!' ? 'clicked!' : 'Click Me!';
    button.textContent = newText;
    try {
        localStorage.setItem("buttontext", newText);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

// Update image function - this will run only once
function updateImage() {
    const img = document.getElementById('shoppingCart');
    img.src = './images/shoppingCart.png';
    img.alt = 'Shopping Cart Icon';
    img.width = 100;
    img.height = 100;
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

    // Add button event listeners
    const button = document.getElementById('updateImage');
    button.textContent = getButtonText(); // Set initial text from localStorage
    
    button.addEventListener('click', toggleButtonText);
    button.addEventListener('click', updateImage, { once: true });

    // Create red, green, blue buttons only
    const colorButtonsDiv = document.getElementById('colorButtons');
    const buttons = [
        { color: 'red', text: 'Button 1' },
        { color: 'green', text: 'Button 2' },
        { color: 'blue', text: 'Button 3' }
    ];
    
    buttons.forEach(({ color, text }) => {
        const btn = document.createElement('button');
        btn.className = 'colorBtn';
        btn.textContent = text;
        btn.style.backgroundColor = color;
        btn.style.color = 'white';
        colorButtonsDiv.appendChild(btn);
    });

    // Add event delegation for color buttons
    colorButtonsDiv.addEventListener('mouseover', function(event) {
        if (event.target.matches('.colorBtn')) {
            if (!event.target.dataset.originalColor) {
                event.target.dataset.originalColor = event.target.style.backgroundColor;
            }
            event.target.style.backgroundColor = 'purple';
        }
    });

    // Add mouseout event to restore original color
    colorButtonsDiv.addEventListener('mouseout', function(event) {
        if (event.target.matches('.colorBtn') && event.target.dataset.originalColor) {
            event.target.style.backgroundColor = event.target.dataset.originalColor;
        }
    });
    
    // Add event delegation for shopping list items
    const shoppingList = document.querySelector('.shopping');
    shoppingList.addEventListener('click', function(event) {
        if (event.target.matches('li')) {
            if (event.target.style.textDecoration === 'line-through') {
                event.target.style.textDecoration = 'none';
            } else {
                event.target.style.textDecoration = 'line-through';
            }
        }
    });
});