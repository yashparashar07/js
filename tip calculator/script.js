function calculateTip() {
    // Clear previous error messages
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach(errorElement => errorElement.textContent = "");
  
    // Get input values
    const billAmount = parseFloat(document.getElementById("billAmount").value);
    const tipPercentage = parseFloat(document.getElementById("tipPercentage").value);
    const customTipAmount = parseFloat(document.getElementById("customTipAmount").value);
    const splitBill = parseInt(document.getElementById("splitBill").value);
  
    // Validate input
    if (isNaN(billAmount) || billAmount <= 0) {
      document.getElementById("billAmountError").textContent = "Please enter a valid bill amount.";
      return;
    }
  
    if (isNaN(tipPercentage) || tipPercentage < 0) {
      document.getElementById("tipPercentageError").textContent = "Please enter a valid tip percentage.";
      return;
    }
  
    if (isNaN(customTipAmount) || customTipAmount < 0) {
      document.getElementById("customTipAmountError").textContent = "Please enter a valid custom tip amount.";
      return;
    }
  
    if (isNaN(splitBill) || splitBill <= 0) {
      document.getElementById("splitBillError").textContent = "Please enter a valid number of people to split the bill.";
      return;
    }
  
    // Calculate tip amount and total amount
    const tipAmount = customTipAmount > 0 ? customTipAmount : billAmount * (tipPercentage / 100);
    const totalAmount = billAmount + tipAmount;
    const amountPerPerson = totalAmount / splitBill;
  
    // Display tip amount, total amount, and amount per person
    document.getElementById("tipAmount").textContent = tipAmount.toFixed(2);
    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
    document.getElementById("amountPerPerson").textContent = amountPerPerson.toFixed(2);
  }
  
  // Automatically update results when input values change
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => input.addEventListener("input", calculateTip));
  