(function(){
    const authRoot = firebase.auth();
    const dbRoot = firebase.database();
    const storageRootRef = firebase.storage().ref();
    const warningPop = document.getElementById('warning');
    const logOutBtn = $('#logOut');
    const editChangesBtn = $('#editChanges');
    const deleteAccountBtn = $('#deleteAccount');
    const publishBtn = $('#publish');
    var userName, userMail, userPic, userFile;
    function refreshPage(){
        window.location.reload();
    };
    
    authRoot.onAuthStateChanged(function(user){
        if(user){
            userName = user.displayName;
            userMail = user.email;
            userPic = user.photoURL;
            userID = user.uid;
            $('.card-img-top').attr('src', userPic);
            $('.username').attr('value', userName);
            $('#nameDisplay').attr('value', userName);
            $('.useremail').attr('value', "<" + userMail + ">");
            var usersWork = dbRoot.ref('users/').child(userID);
            usersWork.on('child_added', snap => {
                var userWorkURL = snap.child("link").val();
                var userWorkTime = snap.child("time").val();
                var userWorkTitle = snap.child("title").val();
                $('.userWorkRow').append('<div class="col-md-5 m-1 zoom"><a href="'+ userWorkURL +'" class="btn-outline-info card userLink" target="_blank"><div class="card-body"><i class="fa fa-file-pdf-o pb-3"></i><h5 class="card-title">'+ userWorkTitle +'</h5><div class="card-text">'+ new Date(userWorkTime) +'</div></div></a></div>');
            });
            usersWork.on('child_removed', snap => {
                snap.remove();
            });
            if (userName == null) {
                $('.username').addClass('form-control');
                $('.username').prop('readonly', false);
                $('#nameDisplay').prop('readonly', false);
                editChangesBtn.on('click', function () {
                    user.updateProfile({
                        displayName: $('.card-title').val(),
                    }).then().catch(function (e) {
                        warningPop.innerHTML = e.message;
                        if (e.message != '') {
                            warningPop.classList.add('show');
                            warningPop.classList.add('fixed-bottom');
                        } else {
                            warningPop.classList.remove('show');
                            warningPop.classList.remove('fixed-bottom');
                        }
                    });
                });
            };
            if (userPic == null) {
                user.updateProfile({
                    photoURL: "./lib/user.png",
                }).then().catch(function (e) {
                    warningPop.innerHTML = e.message;
                    if (e.message != '') {
                        warningPop.classList.add('show');
                        warningPop.classList.add('fixed-bottom');
                    } else {
                        warningPop.classList.remove('show');
                        warningPop.classList.remove('fixed-bottom');
                    }
                });
            };
            logOutBtn.on('click', function () {
                authRoot.signOut().then(function () {
                    window.location.replace('../index.html')
                }).catch(function (e) {
                    warningPop.innerHTML = e.message;
                    if (e.message != '') {
                        warningPop.classList.add('show');
                        warningPop.classList.add('fixed-bottom');
                    } else {
                        warningPop.classList.remove('show');
                        warningPop.classList.remove('fixed-bottom');
                    }
                });
            });
            deleteAccountBtn.on('click', function(){
                $("#deleteAccountModal").modal('show');
                $("#confirmDelete").on('input', function(){
                    if($(this).prop('checked', true)){
                        $("#deleteAccountModal .btn-outline-danger").prop('disabled', false);
                    }
                    $("#deleteAccountModal .btn-outline-danger").on('click', function () {
//                        dbRoot.ref('users/' + userID).remove(); // Remove the user's data stored in DB
                        user.delete().then(function () {
                            window.location.replace('../index.html')
                        }).catch(function (e) {
                            warningPop.innerHTML = e.message;
                            if (e.message != '') {
                                warningPop.classList.add('show');
                                warningPop.classList.add('fixed-bottom');
                            } else {
                                warningPop.classList.remove('show');
                                warningPop.classList.remove('fixed-bottom');
                            }
                        });
                    });
                });
            });
            publishBtn.on('click', function(){
                $('#loadingModal').modal('show');
                userFile = document.getElementById('fileUpload').files[0];
                var uploadUserFile = storageRootRef.child('files/' + userFile.name).put(userFile);
                uploadUserFile.on('state_changed', function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $('.progress-bar').css({"width": progress + "%",});
                    if(progress == 100) {
                        $('.progress-bar').addClass('bg-success').removeClass('bg-info');
                        $('.spinner-border').removeClass('show');
                        $('#uploadAlert').text('Your file has been uploaded!');
                        $('#uploadAlert').addClass('alert-success show');
                    }
                    $('#loadingModal').on('hide.bs.modal', function(){
                        $('.progress-bar').removeClass('bg-success').addClass('bg-info');
                        $('#uploadAlert').removeClass('alert-success show');
                        $('.spinner-border').addClass('show');
                    });
                }, function(error){
                    $('#uploadAlert').text(error.message);
                    $('#uploadAlert').addClass('alert-danger show');
                }, function(){
                    uploadUserFile.snapshot.ref.getDownloadURL().then(function(downloadURL){
                        const postDate = Date.now();
                        const newPostKey = dbRoot.ref('latest/').push().key;
                        const userUpdate = {
                            title: $('#titleDisplay').val(),
                            link: downloadURL,
                            time: postDate,
                        };
                        const postUpdate = {
                            name: $('#nameDisplay').val(),
                            title: $('#titleDisplay').val(),
                            description: $('#summaryDisplay').val(),
                            photo: userPic,
                            link: downloadURL,
                            time: postDate,
                        };
                        dbRoot.ref('users/' + userID + "/" + postDate).set(userUpdate);
                        dbRoot.ref('latest/' + newPostKey).set(postUpdate);
                    });
                });
            });
        } else {
            window.location.replace('../index.html');
        };
    });
    authRoot.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){}).catch(function(e){
        warningPop.innerHTML = e.message;
        if (e.message != '') {
            warningPop.classList.add('show');
            warningPop.classList.add('fixed-bottom');
        } else {
            warningPop.classList.remove('show');
            warningPop.classList.remove('fixed-bottom');
        }
    });
}())