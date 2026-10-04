const API_BASE_URL = "http://127.0.0.1:8080";


async function calculateExpression(expression) {

    const response = await fetch(
        `${API_BASE_URL}/api/calculate`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                expression: expression
            })
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.error || "Calculation failed"
        );
    }


    return data;
}

async function getHistory() {

    const response = await fetch(
        `${API_BASE_URL}/api/history`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to load history"
        );
    }

    return data;
}


async function deleteHistory(id) {

    const response = await fetch(
        `${API_BASE_URL}/api/history/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to delete history"
        );
    }

    return data;
}