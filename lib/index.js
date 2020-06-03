var vHeight = $(window).height(), vWidth = $(window).width(), cover = $('.full'), halfvh = vHeight/2, thirdvh = vHeight/3, halfvw = vWidth/2.5;
cover.css({"min-height":vHeight,"max-width":vWidth,});
$(document).ready(function(){
    if($(window).width() < 1000) {
        $(".nav").addClass("flex-column text-center");
        $(".services").addClass("flex-column text-center").removeClass('p-5');
        $(".services .card").addClass("w-100");
        $('.nav-item').on('click',function(){
            $('.navbar-collapse').collapse('hide');
        });
    }
});
$('.banner').css({"height": $('.navbar').height() + 16,});
$('.nav-link').each(function(){
    $(this).click(function(){
        $(this).tab("show");
        $('html, body').delay(400).animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1000);
    })
});
$(document).ready(function(){
	$('a[role="tab"]').on('show.bs.tab', function(e) {
		localStorage.setItem('activeTab', $(e.target).attr('href'));
	});
	var activeTab = localStorage.getItem('activeTab');
	if(activeTab){
		$('.nav-pills a[href="' + activeTab + '"]').tab('show');
	}
    var themeConfig = window.localStorage.getItem('theme');
    function toggleVal(){
        $('body').toggleClass('bg-dark text-white');
        $('#themetoggle').text('Dark Theme');
        $('.navbar').toggleClass('navbar-dark');
        $('.btn.btn-outline-dark').toggleClass('btn-outline-light');
        $('a.text-dark').toggleClass('text-white-50');
        if($('body').hasClass('bg-dark')) {
            $('#themetoggle').text('Light Theme');
            $('.btn.btn-outline-dark').addClass('btn-outline-light').removeClass('btn-outline-dark');
            $('.btn.btn-outline-primary').addClass('btn-primary').removeClass('btn-outline-primary');
        } else {
            $('.btn.btn-outline-light').addClass('btn-outline-dark').removeClass('btn-outline-light');
            $('.btn.btn-primary').addClass('btn-outline-primary').removeClass('btn-primary');
        }
    }
    if (themeConfig) {
        toggleVal();
    }
    $('#themetoggle').on('click', function(){
        toggleVal();
        window.localStorage.setItem('theme', 'true');
        if(themeConfig) {
            window.localStorage.clear();
        }
    });
});
if (window.location.pathname == '/signup.html') {
    $('input[type="password"]').on('input', function () {
        if ($('#password').val() != $('#conpassword').val()) {
            $('#conpassword').css({'box-shadow': '0 0 0 0.2rem rgba(255,0,0,.25)'});
            $("button[type='submit']").prop('disabled', true);
            $("#passtoggle").removeClass('hide');
        } else {
            $("#passtoggle").addClass('hide');
            $('#conpassword').css({'box-shadow': '0 0 0 0.2rem rgba(0,255,0,.25)'});
            $("button[type='submit']").prop('disabled', false);
        }
    });
};
$('#passtoggle').on('click', function(){
    $('input[type="password"]').attr('type') ? 
    $('input[type="password').removeAttr('type') : $('input[type="password').attr('type', 'password');
});
var copyrightYear = new Date().getFullYear();
$('footer div.text-center').append('<i class="fa fa-copyright"></i>'+ copyrightYear +' MASKO');
$(document).on('scroll', function(){
    console.log($('html').offset())
});