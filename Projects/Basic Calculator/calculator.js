document.addEventListener("DOMContentLoaded", function() {
    const display = document.querySelector(".calculator-display");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";  // Stores the current number being typed
    let expression = "";    // Stores the complete expression with operators

    // Function to update the display
    function updateDisplay(value) {
        display.value = value;
    }

    // Function to clear all inputs
    function clearAll() {
        currentInput = "";
        expression = "";
        updateDisplay("0");
    }

    // Function to evaluate the expression
    function calculate() {
        try {
            // Evaluate the expression using JavaScript's eval() function
            let result = eval(expression);
            updateDisplay(result);
            expression = result.toString();  // Set result as the new expression for continued calculations
        } catch (error) {
            updateDisplay("Error");
            expression = "";  // Reset expression in case of error
        }
    }

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (!isNaN(value) || value === ".") {
                // If it's a number or decimal point, add it to current input
                currentInput += value;
                expression += value;
                updateDisplay(expression);
            } else if (value === "C") {
                clearAll();
            } else if (value === "=") {
                calculate();
            } else {
                // If it's an operator
                if (currentInput === "" && expression === "") return;  // Avoid operator as the first input
                if (isNaN(expression.slice(-1))) {
                    // Prevent consecutive operators by replacing the last one
                    expression = expression.slice(0, -1);
                }
                expression += value;
                currentInput = "";  // Reset current input for the next number
                updateDisplay(expression);
            }
        });
    });

    // Initialize display to 0
    updateDisplay("0");
});
