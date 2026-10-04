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


// =========================================
// Expression state
// =========================================

let rawExpression = "";


// 后端格式 -> 显示格式
//
// 3*4/2
// ↓
// 3×4÷2
function formatExpression(expression) {

    return expression
        .replaceAll("*", "×")
        .replaceAll("/", "÷");
}


// 显示格式 -> 后端格式
//
// 3×4÷2
// ↓
// 3*4/2
function normalizeExpression(expression) {

    return expression
        .replaceAll("×", "*")
        .replaceAll("÷", "/");
}


function updateExpressionDisplay() {

    expressionInput.value =
        formatExpression(rawExpression);
}


function getRawExpression() {

    return rawExpression;
}


function appendToExpression(value) {

    rawExpression += value;

    updateExpressionDisplay();

    expressionInput.focus();
}


function clearExpression() {

    rawExpression = "";

    updateExpressionDisplay();

    showResult("—");

    expressionInput.focus();
}


function removeLastCharacter() {

    rawExpression =
        rawExpression.slice(0, -1);

    updateExpressionDisplay();

    expressionInput.focus();
}


// =========================================
// Result
// =========================================

function showResult(value) {

    resultDisplay.classList.remove("error");

    resultDisplay.textContent = value;
}


function showError(message) {

    resultDisplay.classList.add("error");

    resultDisplay.textContent = message;
}


// =========================================
// History
// =========================================

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

                <div class="history-content">

                    <div class="history-expression">
                        ${formatExpression(record.expression)}
                    </div>

                    <div class="history-result">
                        ${record.result}
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


// =========================================
// History panel
// =========================================

function openHistoryPanel() {

    historyPanel.classList.add("open");

    overlay.classList.add("open");
}


function closeHistoryPanel() {

    historyPanel.classList.remove("open");

    overlay.classList.remove("open");
}


function syncExpressionFromInput() {

    rawExpression =
        normalizeExpression(
            expressionInput.value
        );

    updateExpressionDisplay();
}