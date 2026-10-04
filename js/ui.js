const expressionInput =
    document.getElementById("expression");

const resultDisplay =
    document.getElementById("result");

const historyPanel =
    document.getElementById("historyPanel");

const overlay =
    document.getElementById("overlay");


function appendToExpression(value) {

    expressionInput.value += value;

    expressionInput.focus();
}


function clearExpression() {

    expressionInput.value = "";

    showResult("—");

    expressionInput.focus();
}


function removeLastCharacter() {

    expressionInput.value =
        expressionInput.value.slice(0, -1);

    expressionInput.focus();
}


function showResult(value) {

    resultDisplay.classList.remove("error");

    resultDisplay.textContent = value;
}


function showError(message) {

    resultDisplay.classList.add("error");

    resultDisplay.textContent = message;
}


function openHistoryPanel() {

    historyPanel.classList.add("open");

    overlay.classList.add("open");
}


function closeHistoryPanel() {

    historyPanel.classList.remove("open");

    overlay.classList.remove("open");
}