<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar el CAPTCHA primero
    session_start();
    
    $userCaptcha = strtolower(trim($_POST['captcha']));
    $expectedCaptcha = strtolower(trim($_POST['expected_captcha'])); // Lo enviaremos oculto
    
    if($userCaptcha !== $expectedCaptcha) {
        echo 'captcha_error';
        exit;
    }

    // Validar y sanitizar los datos
    $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $mensaje = filter_input(INPUT_POST, 'mensaje', FILTER_SANITIZE_STRING);
    
    // Validar campos requeridos
    if(empty($nombre) || empty($email) || empty($mensaje)) {
        echo 'missing_fields';
        exit;
    }
    
    // Configurar el correo
    $para = "luischidopro2004@hotmail.com";
    $asunto = "Nuevo mensaje de contacto: " . substr($nombre, 0, 20);
    
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n\n";
    $cuerpo .= "Mensaje:\n$mensaje";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Intentar enviar el correo
    if(mail($para, $asunto, $cuerpo, $headers)) {
        echo 'success';
    } else {
        echo 'mail_error';
    }
} else {
    echo 'invalid_request';
}
?>