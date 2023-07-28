document.addEventListener("DOMContentLoaded", () => {
    const quoteContainer = document.getElementById("quoteContainer");
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    const newQuoteBtn = document.getElementById("newQuoteBtn");
  
    const apiUrl = "https://api.quotable.io/random";
  
    // Function to fetch a random quote from the API
    async function fetchQuote() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  
    // Function to update the DOM with the new quote
    function displayQuote(quote) {
      quoteElement.textContent = quote.content;
      authorElement.textContent = `— ${quote.author}`;
    }
  
    // Event listener for the "New Quote" button
    newQuoteBtn.addEventListener("click", async () => {
      const quote = await fetchQuote();
      if (quote) {
        displayQuote(quote);
      } else {
        quoteElement.textContent = "Failed to fetch a quote. Please try again later.";
        authorElement.textContent = "";
      }
    });
  
    // Display a random quote on page load
    newQuoteBtn.click();
  });
  