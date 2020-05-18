// Height - width index

var vHeight = $(window).height(), vWidth = $(window).width(), cover = $('.full'), halfvh = vHeight/2, thirdvh = vHeight/3, halfvw = vWidth/2.5;
cover.css({"min-height":vHeight,"max-width":vWidth,});

$(document).ready(function(){
    if($(window).width() < 1000) {
        $(".nav").addClass("flex-column text-center");
    }
});

// Smooth scroll
//
//$(document).ready(function (){
//    $(".navbtn").click(function (){
//        $('html, body').animate({
//            scrollTop: $("#home").offset().top
//        }, 1000);
//    });
//});
//$(document).ready(function (){
//    $(".ferrybtn").click(function (){
//        $('html, body').animate({
//            scrollTop: $("#intro").offset().top
//        }, 1000);
//    });
//});
$('.nav-link').each(function(){
    $(this).click(function(){
        $(this).tab("show");
        $('html, body').delay(400).animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1000);
    })
});

// Password confirmation
$('#conpassword').on('input', function(){
    if($('#password').val() != $('#conpassword').val()){
        $('#conpassword').css({'box-shadow': '0 0 0 0.2rem rgba(255,0,0,.25)'});
        $("button[type='submit']").prop('disabled', true);
    } else {
        $('#conpassword').css({'box-shadow': '0 0 0 0.2rem rgba(0,255,0,.25)'});
        $("button[type='submit']").prop('disabled', false);
    }
});