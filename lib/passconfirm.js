$('input[type="password"]').on('input', function(){
    if($('#password').val() != $('#conpassword').val()){
        $('#conpassword').css({'box-shadow': '0 0 0 0.2rem rgba(255,0,0,.25)'});
        $("button[type='submit']").prop('disabled', true);
        $("#passtoggle").removeClass('hide');
    } else {
        $("#passtoggle").addClass('hide');
        $('#conpassword').css({'box-shadow': '0 0 0 0.2rem rgba(0,255,0,.25)'});
        $("button[type='submit']").prop('disabled', false);
    }
});