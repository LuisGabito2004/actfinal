<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $mensaje = filter_input(INPUT_POST, 'mensaje', FILTER_SANITIZE_STRING);
    
    $para = "luischidopro2004@hotmail.com";
    $asunto = "Nuevo mensaje del sitio Energías Renovables";
    
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n\n";
    $cuerpo .= "Mensaje:\n$mensaje";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if (mail($para, $asunto, $cuerpo, $headers)) {
        header("Location: gracias.html");
        exit;
    } else {
        header("Location: contacto.html?status=error");
        exit;
    }
} else {
    header("Location: contacto.html");
    exit;
}
?>