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
        expressionInput.value.trim();


    if (expression === "") {

        showError("Please enter an expression.");

        return;
    }


    calculateButton.disabled = true;

    calculateButton.textContent = "...";


    try {

        const data =
            await calculateExpression(expression);

        showResult(data.result);

    }

    catch (error) {

        showError(error.message);

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
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            event.preventDefault();

            calculate();
        }


        if (event.key === "Escape") {

            clearExpression();
        }
    }
);


/* =========================================
   History UI
   ========================================= */

historyButton.addEventListener(
    "click",
    openHistoryPanel
);


closeHistoryButton.addEventListener(
    "click",
    closeHistoryPanel
);


overlay.addEventListener(
    "click",
    closeHistoryPanel
);


/* =========================================
   Initial state
   ========================================= */

expressionInput.focus();