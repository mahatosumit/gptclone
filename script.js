const API_KEY = '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';
const submitButton = document.querySelector('#submit');
const outPutElement = document.querySelector('#output');
const inputElement = document.querySelector('#input'); // Corrected selector for input
const historyElement = document.querySelector('#history'); // Corrected selector for history
const buttonElement = document.querySelector('#clear'); // Corrected selector for clear button

function changeInput(value) {
    inputElement.value = value;
}

async function getMessage() {
    console.log('clicked');
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`, // Added space after 'Bearer'
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            Messages: [{
                role: "user",
                content: inputElement.value // Use the value from the input field
            }],
            max_tokens: 100
        })
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        console.log(data);
        outPutElement.textContent = data.choices[0].message.content;
        if (data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click', () => changeInput(pElement.textContent));
            historyElement.append(pElement);
        }
    } catch (error) {
        console.error(error);
    }
}

submitButton.addEventListener('click', getMessage); // Corrected 'addEventListner' to 'addEventListener'

function clearInput() {
    inputElement.value = '';
}

buttonElement.addEventListener('click', clearInput);
