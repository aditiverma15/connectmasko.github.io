var vHeight = $(window).height(), vWidth = $(window).width(), cover = $('.full'), halfvh = vHeight/2, thirdvh = vHeight/3, halfvw = vWidth/2.5;
cover.css({"min-height":vHeight,"max-width":vWidth,});
document.documentElement.style.setProperty('--navbar-height', $('.navbar').height() + 16 + "px");
function closeUsernav(){
    $('.usernav').addClass('fadeout');
    setTimeout(function(){
        $('.usernav').removeClass('show');
        $('.usernav').removeClass('fadeout');
        $('body').css('overflow', 'auto');
    }, 800);
};
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
        closeUsernav();
        $('html, body').delay(400).animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1000);
    })
});
// Password confirmation
$('#passtoggle').on('click', function(){
    $('input[type="password"]').attr('type') ? 
    $('input[type="password').removeAttr('type') : $('input[type="password').attr('type', 'password');
});
$('.navbar-toggler').on('click', function(){
    $('.usernav').addClass('show');
    $('body').css('overflow', 'hidden');
});
$('.closebtn').on('click', function(){
    closeUsernav();
});