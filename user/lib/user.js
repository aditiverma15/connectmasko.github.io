(function(){
    
    const authRoot = firebase.auth();
    const googleAuth = new firebase.auth.GoogleAuthProvider();
    const dbRoot = firebase.database();
    const storageRootRef = firebase.storage().ref();
    
    const btnRegis = document.getElementById('submit');
    const warningPop = document.getElementById('warning');
    const logOutBtn = $('#logOut');
    const editChangesBtn = $('#editChanges');
    const deleteAccountBtn = $('#deleteAccount');
    const publishBtn = $('#publish');
    var userName, userMail, userPic, userFile;
    function refreshPage(){
        window.location.reload();
    };
    function displayWarning() {
        warningPop.innerHTML = e.message;
        if (e.message != '') {
            warningPop.classList.add('show');
            warningPop.classList.add('fixed-bottom');
        } else {
            warningPop.classList.remove('show');
            warningPop.classList.remove('fixed-bottom');
        }
    };
    
    authRoot.onAuthStateChanged(function(user){
        if(user){
            userName = user.displayName;
            userMail = user.email;
            userPic = user.photoURL;
            userID = user.uid;
            $('.card-img-top').attr('src', userPic);
            $('.card-title').attr('value', userName);
            $('#nameDisplay').attr('value', userName);
            $('.card-text').attr('value', "<" + userMail + ">");
            if(userName == null) {
                $('.card-title').addClass('form-control');
                $('.card-title').prop('readonly', false);
                editChangesBtn.on('click', function(){
                    user.updateProfile({
                        displayName: $('.card-title').val(),
                    }).then().catch(function (e) {displayWarning()});
                });
            };
            if (userPic == null) {
                user.updateProfile({
                    photoURL: "./lib/user.png",
                }).then().catch(function(e){displayWarning()});
            };
            logOutBtn.on('click', function(){
                authRoot.signOut().then(function(){
                    window.location.replace('../index.html')
                }).catch(function (e) {displayWarning()});
            });
            // Delete account
            deleteAccountBtn.on('click', function(){
//                user.delete().then(function(){
//                    window.location.replace('../index.html')
//                }).catch(function (e) {displayWarning()});
            });
            // Publish the paper
            publishBtn.on('click', function(){
                $('#loadingModal').modal('show');
                userFile = document.getElementById('fileUpload').files[0];
                var uploadUserFile = storageRootRef.child('files/' + userFile.name).put(userFile);
                uploadUserFile.on('state_changed', function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $('.progress-bar').css({"width": progress + "%",});
                    if(progress == 100) {
                        $('.progress-bar').addClass('bg-success');
                        $('.progress-bar').removeClass('bg-info');
                        $('#loadingModal button').prop('disabled', false);
                        $('#uploadAlert').text('Your file has been uploaded!');
                        $('#uploadAlert').addClass('alert-success');
                        $('#uploadAlert').addClass('show');
                    }
                }, function(error){
                    $('#uploadAlert').text(error.message);
                    $('#uploadAlert').addClass('alert-danger');
                    $('#uploadAlert').addClass('show');
                }, function(){
                    uploadUserFile.snapshot.ref.getDownloadURL().then(function(downloadURL){
                        // Update realtime
                        
//                        console.log('File available at', downloadURL);
                    });
                });
            });
        } else {
            window.location.replace('../index.html');
        };
    });
    authRoot.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){}).catch(function(e){displayWarning()});
}())