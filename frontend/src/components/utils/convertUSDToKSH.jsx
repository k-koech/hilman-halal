// utils/currencyConverter.js

let exchangeRate = null; // Variable to store the exchange rate

// Function to fetch exchange rate and convert USD to KSH
export function convertUSDToKSH(usdAmount) {
    if (exchangeRate === null) {
        // Fetch the exchange rate if it's not already fetched
        fetch("https://api.exchangerate-api.com/v4/latest/USD")
            .then(response => response.json())
            .then(data => {
                exchangeRate = data.rates.KES; // Store the exchange rate for KES
                const kshAmount = usdAmount * exchangeRate; // Convert to KSH
                // console.log(kshAmount.toFixed(2)); // Log or return the KSH amount
            })
            .catch(error => {
                console.error("Error fetching exchange rate:", error);
            });
        
        return 0; // Return a 0/loading message until exchange rate is fetched
    } else {
        // If exchange rate is already available, perform the conversion
        const kshAmount = usdAmount * exchangeRate;
        return kshAmount.toFixed(0); // Return result with 2 decimal places
    }
}
