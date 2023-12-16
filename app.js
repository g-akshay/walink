document.addEventListener('DOMContentLoaded', function () {
    checkClipboardForNumber();
});

function checkClipboardForNumber() {
    // Check if clipboard has a number
    navigator.clipboard.readText()
        .then(text => {
            const phoneNumber = text.trim();

            if (isValidNumber(phoneNumber)) {
                displayLink(phoneNumber);
                displayCountdownAndNavigate(phoneNumber);
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
    const message = encodeURIComponent(`Chat with the copied number: ${phoneNumber}`);

    // Open WhatsApp directly with the chat link in a new tab
    window.open(`${link}?text=${message}`, "_blank");
}

function displayResult(foundNumber) {
    const resultContainer = document.getElementById('result');
    const logElement = document.createElement('div');
    logElement.classList.add('log');

    if (foundNumber) {
        logElement.innerHTML = '<p>Number found in clipboard!</p>';
    } else {
        logElement.innerHTML = '<p>No valid number found in clipboard.</p>';
    }

    resultContainer.appendChild(logElement);
}

function displayCountdownAndNavigate(phoneNumber) {
    let seconds = 3;

    const countdownInterval = setInterval(function () {
        const resultContainer = document.getElementById('result');
        const countdownElement = document.createElement('div');
        countdownElement.classList.add('log');

        if (seconds > 0) {
            countdownElement.innerHTML = `<p>Navigating to ${phoneNumber} in ${seconds} seconds...</p>`;
        } else {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = `<p>Navigating to ${phoneNumber}...</p>`;
            navigateToWhatsApp(phoneNumber);
        }

        resultContainer.appendChild(co
