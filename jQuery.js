$(document).ready(function() {

    // If a number is (can be multi-digit) pressed, it will be 
    //stored in an array after an operation button is pressed.

    var number = "";
    var numbers = [];
    var operation, opSign, result, tempNum;
    var continuedOp = false;
    var numOneValid = false;
    var numTwoValid = false;
    var enterPressed = false;

    $(".number").on("click", function() {
        
        if ($(this).attr("value") !== "0" || number.length > 0) {

            number += $(this).attr("value"); 

        } else if ($(this).attr("value") === "0" && number.length < 1) {

            number = ""; 

        }

        if (numbers.length === 0) {

            $("#first-number").text(number);
            numOneValid = true;

        }

        if (numbers.length === 1) {

            $("#second-number").text(number);
            numTwoValid = true;

        } 
    }) 

    $(".operator").on("click", function() {

        if (numOneValid && !numTwoValid) {

            operation = $(this).attr("value");
            convertToSign(operation);
            $("#operator").text(opSign);

            if (!continuedOp) {

                if (number != "") {

                    numbers[0] = parseInt(number);
                    tempNum = numbers[0];
                    number = "";

                } else {

                    numbers[0] = tempNum;

                }          
                
            } else {    

                clearText();
                $("#operator").text(opSign);
                $("#first-number").text(result);
                numbers = [];
                numbers[0] = result; 
                continuedOp = false;

            }

        }

    })

    // When second number is pressed and equal button is pressed, second 
    // number is stored in the numbers array and the operation stored in 
    // variable operation is executed through calculate function.

    $("#btn-enter").on("click", function() {

        if (!enterPressed) {

            numbers[1] = parseInt(number);
            $("#result").text(calculate(numbers[0], numbers[1], operation));
            continuedOp = true;
            enterPressed = true;
            numTwoValid = false;

        }

    })

    // When clear button is pressed, the panel is cleared.

    $("#btn-clear").on("click", function() { 

        clearText();

    })

    // Calculate() function takes three arguments and use them in the calculation.

    function calculate(num1, num2, mathOp) {

        switch(mathOp) {

            case "plus":
                result = num1 + num2;
                break;
            case "minus":
                result = num1 - num2;
                break;
            case "times":
                result = num1 * num2;
                break;
            case "divide":
                result = num1 / num2;
                break;
            case "power":
                result = Math.pow(num1, num2);
                break;
            case "percent":
                result = num1 * (num2/100);
                break;

        }

        return result;

    }

    // This function is to convert operation from text to operation sign.

    function convertToSign(opText) {

        switch(opText) {

            case "plus":
                opSign = "+";
                break;
            case "minus":
                opSign = "-";
                break;
            case "times":
                opSign = "x";
                break;
            case "divide":
                opSign = "/";
                break;
            case "power":
                opSign = "^";
                break;
            case "percent":
                opSign = "%";
                break;

        }

    }

    // This function clears all the inputs and outputs inside the result panel.

    function clearText() {

        $("#first-number").text("");
        $("#second-number").text("");
        $("#operator").text("");
        $("#result").text("0");
        number = "";
        numbers = [];
        numOneValid = false;
        numTwoValid = false;
        enterPressed = false;

    }
    
});