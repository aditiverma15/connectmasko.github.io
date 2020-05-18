<?php

$firstname = $_POST["fname"];
$lastname = $_POST["lname"];
$email = $_POST["email"];
$password = $_POST["password"];
$name = $firstname." ".$lastname;


// Confirmation mail
$message = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="https://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
        <title>Welcome '.$name.'</title>
    <!--[if mso]>
<style type=”text/css”>
* {
font-family: Futura, sans-serif, Verdana;
}
</style>
<![endif]-->
    <style>
        * {
            font-family: "Open Sans", Geneva, sans-serif, Verdana;
        }
        .main {
            width: 700px
        }
        a {
            outline: none;
            color: darkslategrey;
        }
        p {
            padding: 20px;
            color: #333333;
            font-size: 18px
        }
        img {
            width: 100px;
            height: auto;
            padding: 10px 0;
        }
        .images td {
            text-align: center;
            width: 50%
        }
        .footer {
            text-align: center;
            padding: 10px;
            color: #ffffff;
            font-size: 10px
        }
        .footer a {
            color: #ffffff
        }
        .footer img {
            width: 30px;
            opacity: 0.4
        }

        /* media queries */
        @media only screen and (max-width: 700px) {
            .main {
                width: 400px;
            }
            img {
                width: 50px;
            }
        }
        @font-face {
            font-family: "Open Sans";
            font-style: normal;
            font-weight: 400;
            src: local("Open Sans Regular"), local("OpenSans-Regular"), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
    </style>
    </head>
    <body style="padding: 0;margin: 0;">
        <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#eeeeee" style="border: 0;">
            <tr>
                <td>
                    <table align="center" class="main" cellspacing="0" cellpadding="0" border="0" bgcolor="#eee">
                        <tr>
                            <td>
                                <table width="100%">
                                    <tr>
                                        <td style="padding: 10px 5px;text-align: right;color: #000;font-size: 12px">Having trouble viewing this mail?</td>
                                        <td style="padding: 10px 5px;font-size: 12px"><a href="#" target="_blank">View it in your browser</a></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" bgcolor="#0a9687">
                                    <tr>
                                        <td>
                                            <h1 style="padding: 10px;text-align: center;color: floralwhite;font-size: 40px">Welcome aboard, '.$name.'!</h1>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" bgcolor="#ddd">
                                    <tr>
                                        <td>
                                            <p>You have successfully registered to the MASKO Library, we are looking forward for you to start publishing your papers and do a lot of amazing stuff on our platform!</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Account details: <br>
                                                '.$name.'<br>
                                                '.$email.'<br>
                                                '.$password.'<br>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" bgcolor="#ddd">
                                    <tr>
                                        <td><center><a href="#" target="_blank">Hope on to your profile!</a></center></td>
                                        <td><center><a href="#" target="_blank">Publish a paper!</a></center></td>
                                        <td><center><a href="#" target="_blank">Go through a paper!</a></center></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table class="footer" width="100%" bgcolor="#646967">
                                    <tr>
                                        <td><a href="https://twitter.com/MASKO86832184" target="_blank"><img src="http://connectmasko.github.io/lib/email/twitter.png" alt="Twitter"></a></td>
                                        <td><a href="https://www.facebook.com/MASKO-108746267453884/?modal=admin_todo_tour" target="_blank"><img src="http://connectmasko.github.io/lib/email/facebook.png" alt="Facebook"></a></td>
                                        <td><a href="https://www.instagram.com/connect_to_masko/" target="_blank"><img src="http://connectmasko.github.io/lib/email/instagram.png" alt="Instagram"></a></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
';
$headers = "MIME-Version: 1.0" . "\r\n"."Content-type:text/html;charset=UTF-8" ."\r\n"."From: Admin";
$subject = "Welcome to the MASKO Library!";
mail($email, $subject, $message, $headers);
header('Location: https://yuvishere.co');
?>
