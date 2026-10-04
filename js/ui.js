const expressionInput =
    document.getElementById("expression");

const resultDisplay =
    document.getElementById("result");

const historyPanel =
    document.getElementById("historyPanel");

const overlay =
    document.getElementById("overlay");

const historyList =
    document.getElementById("historyList");

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


function renderHistory(history) {

    historyList.innerHTML = "";


    if (history.length === 0) {

        historyList.innerHTML = `
            <div class="history-empty">
                No calculation history yet.
            </div>
        `;

        return;
    }


    for (const record of history) {

        const item =
            document.createElement("div");

        item.className = "history-item";


        item.innerHTML = `
            <div class="history-item-top">

                <div>
                    <div class="history-expression">
                        ${record.expression}
                    </div>

                    <div class="history-result">
                        = ${record.result}
                    </div>
                </div>

                <button
                    class="history-delete"
                    data-history-id="${record.id}"
                    type="button"
                >
                    Delete
                </button>

            </div>

            <div class="history-time">
                ${record.created_at}
            </div>
        `;


        historyList.appendChild(item);
    }
}


function showHistoryError(message) {

    historyList.innerHTML = `
        <div class="history-empty">
            ${message}
        </div>
    `;
}