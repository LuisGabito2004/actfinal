document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');
  
  // Generar CAPTCHA
  function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let captcha = '';
    for(let i = 0; i < 4; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('captcha-text').textContent = captcha;
    document.getElementById('captcha-value').value = captcha;
    return captcha;
  }
  
  generateCaptcha();
  
  // Manejar envío
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validar CAPTCHA
    const userInput = form.querySelector('[name="captcha"]').value;
    const captchaValue = document.getElementById('captcha-value').value;
    
    if(userInput !== captchaValue) {
      showMessage('Las letras de verificación no coinciden', 'error');
      generateCaptcha();
      return;
    }
    
    // Deshabilitar botón para evitar múltiples envíos
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    try {
      // Enviar con AJAX
      const formData = new FormData(form);
      
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if(response.ok) {
        showMessage('Mensaje enviado con éxito', 'success');
        form.reset();
        generateCaptcha();
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      showMessage('Error al enviar. Por favor intenta nuevamente.', 'error');
      console.error('Error:', error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
    }
  });
  
  // Mostrar mensajes de estado
  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.style.display = 'block';
    formMessage.style.color = type === 'success' ? '#2e7d32' : '#d32f2f';
    formMessage.style.backgroundColor = type === 'success' ? '#e8f5e9' : '#ffebee';
    formMessage.style.padding = '10px';
    formMessage.style.margin = '10px 0';
    formMessage.style.borderRadius = '4px';
    
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
});