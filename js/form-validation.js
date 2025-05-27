document.addEventListener('DOMContentLoaded', function() {
    // Generar letras aleatorias para el CAPTCHA
    function generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';
        let captcha = '';
        for(let i = 0; i < 4; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }

    // Mostrar CAPTCHA al usuario
    const captchaLetters = document.getElementById('captcha-letters');
    const captchaInput = document.getElementById('captcha');
    let currentCaptcha = generateCaptcha();
    captchaLetters.textContent = currentCaptcha;

    // Validar el formulario
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar CAPTCHA
        if(captchaInput.value.toLowerCase() !== currentCaptcha.toLowerCase()) {
            document.getElementById('captcha-error').style.display = 'block';
            captchaInput.focus();
            return false;
        }

        // Enviar formulario con AJAX
        const formData = new FormData(contactForm);
        
        fetch('/actfinal/send-mail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            formMessages.style.display = 'block';
            if(data === 'success') {
                formMessages.style.backgroundColor = '#d4edda';
                formMessages.style.color = '#155724';
                formMessages.innerHTML = '¡Mensaje enviado con éxito!';
                contactForm.reset();
                currentCaptcha = generateCaptcha();
                captchaLetters.textContent = currentCaptcha;
            } else {
                formMessages.style.backgroundColor = '#f8d7da';
                formMessages.style.color = '#721c24';
                formMessages.innerHTML = 'Error al enviar el mensaje. Por favor intenta nuevamente.';
            }
        })
        .catch(error => {
            formMessages.style.display = 'block';
            formMessages.style.backgroundColor = '#f8d7da';
            formMessages.style.color = '#721c24';
            formMessages.innerHTML = 'Error de conexión. Por favor intenta nuevamente.';
        });
    });

    // Regenerar CAPTCHA si el usuario tiene dificultad
    document.getElementById('refresh-captcha').addEventListener('click', function(e) {
        e.preventDefault();
        currentCaptcha = generateCaptcha();
        captchaLetters.textContent = currentCaptcha;
        captchaInput.value = '';
    });
});