// Function to fetch Kaspa price using CoinGecko API
async function getKaspaPrice() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd';
    const response = await fetch(url);
    const data = await response.json();
    return data.kaspa.usd; // Returns the price of Kaspa in USD
}

// Save user input to chrome.storage
function saveKaspaAmount(amount) {
    chrome.storage.local.set({ kaspaAmount: amount }, () => {
        console.log('Kaspa amount saved:', amount);
    });
}

// Load user data from chrome.storage
function loadKaspaAmount() {
    chrome.storage.local.get('kaspaAmount', (result) => {
        if (result.kaspaAmount) {
            document.getElementById("kaspaAmount").value = result.kaspaAmount;
            updatePortfolio();
        }
    });
}

// Function to update the portfolio value
async function updatePortfolio() {
    const kaspaAmount = document.getElementById("kaspaAmount").value;
    saveKaspaAmount(kaspaAmount); // Save the amount to storage
    const kaspaPrice = await getKaspaPrice();
    const portfolioValue = kaspaAmount * kaspaPrice;

    // Display the price and portfolio value
    document.getElementById("kaspaPrice").innerText = kaspaPrice.toFixed(4);
    document.getElementById("portfolioValue").innerText = portfolioValue.toFixed(2);
}

// Set up event listener
document.getElementById("updatePortfolio").addEventListener("click", updatePortfolio);

// Load saved amount when the page is loaded
loadKaspaAmount();

// Initial fetch to show price when page loads
getKaspaPrice().then(price => {
    document.getElementById("kaspaPrice").innerText = price.toFixed(2); // 6 decimal places
});

