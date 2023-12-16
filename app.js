document.addEventListener('DOMContentLoaded', function () {
    checkClipboardForNumber();
});

function checkClipboardForNumber() {
    // Check if clipboard has a number
    navigator.clipboard.readText()
        .then(text => {
            const phoneNumber = text.trim();

            if (isValidNumber(phoneNumber)) {
                // Clear existing logs on success
                clearLogs();
                displayLink(phoneNumber);
            } else {
                displayResult(false);
            }
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
            displayResult(false);
        });
}

function isValidNumber(number) {
    // You can implement your own validation logic here
    return /^\d{10}$/.test(number);
}

function displayLink(phoneNumber) {
    const link = `https://wa.me/${phoneNumber}`;
    const message = encodeURIComponent("Chat with the copied number");

    // Display the countdown
    displayCountdown(3, phoneNumber);
}

function displayResult(foundNumber) {
    const resultContainer = document.getElementById('result');

    if (!foundNumber) {
        // Display no valid number found message
        const logElement = document.createElement('div');
        logElement.classList.add('log');
        logElement.innerHTML = '<p>No valid number found in clipboard.</p>';
        resultContainer.appendChild(logElement);
    }
}

function clearLogs() {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';
}

function displayCountdown(seconds, phoneNumber) {
    const resultContainer = document.getElementById('result');
    const countdownElement = document.createElement('div');
    countdownElement.classList.add('log', 'countdown');

    let counter = seconds;

    const countdownInterval = setInterval(() => {
        countdownElement.innerHTML = `<p>Navigating to ${phoneNumber} in ${counter} seconds...</p>`;
        counter--;

        if (counter < 0) {
            clearInterval(countdownInterval);
            resultContainer.removeChild(countdownElement);

            // Open WhatsApp directly with the chat link after countdown
            const link = `https://wa.me/${phoneNumber}`;
            const message = encodeURIComponent("Chat with the copied number");
            window.open(`${link}?text=${message}`, "_blank");

            // Clear everything on re-navigation
            clearLogs();
        }
    }, 1000);

    resultContainer.appendChild(countdownElement);
}
