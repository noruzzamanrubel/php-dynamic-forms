<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Check if Name and Email fields are not empty
if (isset($_POST['author']) && isset($_POST['email']) && !empty($_POST['author']) && !empty($_POST['email'])) {
    //get data from form
    $author = $_POST['author'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $subject = $_POST['subject'];
    $comment = $_POST['comment'];

    // preparing mail content
    $messagecontent = "Name = " . $author . "<br>Email = " . $email . "<br>Phone = " . $number . "<br>Website = " . $subject . "<br>Message = " . $comment;

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();                                        //Send using SMTP
        $mail->Host       = 'sandbox.smtp.mailtrap.io';         //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                               //Enable SMTP authentication
        $mail->Username   = 'c8225660409925';                   //SMTP username
        $mail->Password   = '07c2024e49b477';                   //SMTP password
        $mail->Port       = 2525;                               //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('welcome6921@gmail.com', 'Mailer');
        $mail->addAddress('welcome6921@gmail.com', 'Boomdevs');
        $mail->addAddress('ellen@example.com');
        $mail->addReplyTo('welcome6921@gmail.com', 'Information');

        //Attachments
        //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        //$mail->addAttachment('photo.jpeg', 'photo.jpeg');    //Optional name

        //Content
        $mail->isHTML(true);                                    //Set email format to HTML
        $mail->Subject = 'Here is the subject';
        $mail->Body    = $messagecontent;

        $mail->send();

    } catch (Exception $e) {
        // Do nothing or log the error, if needed
    }
} else {
    // If Name or Email field is empty, redirect back to the form page
    header("Location: http://" . $_SERVER['HTTP_HOST'] . "/contact.html");
    exit;
}
?>
