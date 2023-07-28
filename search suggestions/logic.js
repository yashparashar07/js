document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("searchBox");
    const suggestionsList = document.getElementById("suggestionsList");
  
    const suggestions = [
      "apple",
      "banana",
      "orange",
      "grape",
      "pineapple",
      "kiwi",
      "mango",
      "strawberry",
      "blueberry",
      "watermelon",
    ];
  
    // Function to show search suggestions
    function showSuggestions(input) {
      // Clear previous suggestions
      suggestionsList.innerHTML = "";
  
      // Filter suggestions based on user input
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(input.toLowerCase())
      );
  
      // Display the filtered suggestions
      filteredSuggestions.forEach((suggestion) => {
        const listItem = document.createElement("li");
        listItem.textContent = suggestion;
        suggestionsList.appendChild(listItem);
      });
    }
  
    // Function to handle input changes and show suggestions
    function handleInput() {
      const userInput = searchBox.value;
      showSuggestions(userInput);
    }
  
    // Attach event listener to the search box
    searchBox.addEventListener("input", handleInput);
  });
  