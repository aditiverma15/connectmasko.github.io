<?php

$firstname = $_POST["fname"];
$lastname = $_POST["lname"];
$email = $_POST["email"];
$phonenumber = $_POST["phone"];
$name = $firstname." ".$lastname;
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
                                            <h1 style="padding: 10px;text-align: center;color: floralwhite;font-size: 40px">You have reached us '.$name.'!</h1>
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
                                            <p>You have successfully reached us for a consultation. We will reach out to you shortly via your provided mobile number!</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Your details: <br>
                                                '.$name.'<br>
                                                '.$email.'<br>
                                                '.$phonenumber.'<br>
                                            </p>
                                        </td>
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
$subject = "Welcome to the MASKO Consultation!";
$admins = "connect.masko@gmail.com";
$notifhead = "You have a new lead!";
$notifbod = "You have received a form submission. View it here: <a target='_blank' href='https://www.connectmasko.co/restrict.html'>Click Here.</a>";
$file_open = fopen("consultation.csv", "a");
$no_rows = count(file("consultation.csv"));
if($no_rows > 1){
    $no_rows = ($no_rows - 1) + 1;
}
$form_data = array(
    'sr_no'  => $no_rows,
    'name'  => $name,
    'email'  => $email,
    'phone' => $phonenumber
);
fputcsv($file_open, $form_data);
mail($email, $subject, $message, $headers);
mail($admins, $notifhead, $notifbod, $headers);
echo '
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="author" content="MASKO">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="refresh" content="3; url=../index.html">
	<title>Thank you!</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body class="jumbotron container" onpageshow="thankredirect()">
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <h1 class="text-center">We will reach out to you shortly, '.$name.'</h1><br><br>
            <div class="text-muted">You will be redirected to the <a class="text-dark" href="../index.html">homepage</a> in <span id="cntdown"></span></div>
        </div>
    </div>
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script>
    function thankredirect(){
        var i = 3;
        setInterval(function(){
        document.getElementById("cntdown").innerHTML = i;
        if(i > 0) {
        i--;
        };
        }, 1000);
    };
    </script>
</body>
</html>
';
?>
