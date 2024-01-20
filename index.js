// script.js
const apiUrl = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';

// Function to fetch and display menu items
async function getMenu() {
    try {
        const response = await fetch(apiUrl);
        const menuItems = await response.json();

        // Display menu items on the screen
        displayMenu(menuItems);
    } catch (error) {
        handleError(error);
    }
}

// Function to take order
function takeOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            // Select 3 random burgers and add them to the order object
            const order = {
                burgers: getRandomBurgers()
            };
            resolve(order);
        }, 2500);
    });
}

// Function to prepare the order
function orderPrep() {
    return new Promise(resolve => {
        setTimeout(() => {
            // Return the object with order_status as true and paid as false
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Function to pay the order
function payOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            // Return the object with order_status as true and paid as true
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Function to display a thank you message
function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

// Function to display menu items on the screen
function displayMenu(menuItems) {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = '<h2>Menu</h2>';

    // Display menu items
    menuItems.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.innerHTML = `<p>${item.name} - $${item.price}</p>`;
        appDiv.appendChild(menuItemDiv);
    });

    // Add order button with event listener
    const orderButton = document.createElement('button');
    orderButton.innerText = 'Place Order';
    orderButton.addEventListener('click', handleOrder);
    appDiv.appendChild(orderButton);
}

// Function to handle order process
async function handleOrder() {
    try {
        // Get menu
        await getMenu();

        // Take order
        const order = await takeOrder();

        // Order preparation
        const prepResult = await orderPrep();
        if (!prepResult.order_status) {
            throw new Error('Order preparation failed.');
        }

        // Pay order
        const paymentResult = await payOrder();
        if (!paymentResult.paid) {
            throw new Error('Payment failed.');
        }

        // Display thank you message
        thankyouFnc();
    } catch (error) {
        handleError(error);
    }
}

// Function to get random burgers
function getRandomBurgers() {
    // Replace this with your logic to select random burgers
    const burgers = ['Classic Burger', 'Cheese Burger', 'Bacon Burger'];
    return burgers;
}

// Function to handle errors
function handleError(error) {
    console.error('An error occurred:', error.message);
    alert('An error occurred. Please try again later.');
}
