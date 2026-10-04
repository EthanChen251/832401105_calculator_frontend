const calculateButton =
    document.getElementById("calculateButton");

const historyButton =
    document.getElementById("historyButton");

const closeHistoryButton =
    document.getElementById("closeHistoryButton");


/* =========================================
   Calculator buttons
   ========================================= */

document
    .querySelectorAll("[data-value]")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                appendToExpression(
                    button.dataset.value
                );
            }
        );
    });


document
    .querySelector('[data-action="clear"]')
    .addEventListener(
        "click",
        clearExpression
    );


document
    .querySelector('[data-action="backspace"]')
    .addEventListener(
        "click",
        removeLastCharacter
    );


/* =========================================
   Calculate
   ========================================= */

async function calculate() {

    const expression =
        getRawExpression().trim();


    if (expression === "") {

        showError(
            "Please enter an expression."
        );

        return;
    }


    calculateButton.disabled = true;

    calculateButton.textContent = "...";


    try {

        const data =
            await calculateExpression(
                expression
            );

        showResult(
            data.result
        );

    }

    catch (error) {

        showError(
            error.message
        );

    }

    finally {

        calculateButton.disabled = false;

        calculateButton.textContent = "=";
    }
}


calculateButton.addEventListener(
    "click",
    calculate
);


/* =========================================
   Keyboard
   ========================================= */

expressionInput.addEventListener(
    "input",
    syncExpressionFromInput
);


/* =========================================
   History UI
   ========================================= */

historyButton.addEventListener(
    "click",
    async () => {

        openHistoryPanel();

        await loadHistory();
    }
);

historyList.addEventListener(
    "click",
    async (event) => {

        const deleteButton =
            event.target.closest(".history-delete");

        if (!deleteButton) {
            return;
        }

        const id =
            deleteButton.dataset.historyId;

        console.log("Deleting history id:", id);

        deleteButton.disabled = true;
        deleteButton.textContent = "...";

        try {
            await deleteHistory(id);

            // 删除数据库记录后，重新读取数据库
            await loadHistory();
        }
        catch (error) {
            console.error(error);

            showHistoryError(
                error.message
            );
        }
    }
);

closeHistoryButton.addEventListener(
    "click",
    closeHistoryPanel
);


overlay.addEventListener(
    "click",
    closeHistoryPanel
);

async function loadHistory() {

    historyList.innerHTML = `
        <div class="history-empty">
            Loading...
        </div>
    `;


    try {

        const history =
            await getHistory();

        renderHistory(history);

    }

    catch (error) {

        showHistoryError(
            error.message
        );
    }
}

/* =========================================
   Initial state
   ========================================= */

expressionInput.focus();