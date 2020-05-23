(function(){
    const authRoot = firebase.auth();
    const googleAuth = new firebase.auth.GoogleAuthProvider();
    const dbRoot = firebase.database();
    const storageRoot = firebase.storage();
    const storageRootRef = firebase.storage().ref();
    const userOperating = authRoot.currentUser;
    const btnRegis = document.getElementById('submit');
    const warningPop = document.getElementById('warning');
    const logOutBtn = $('#logOut');
    const editChangesBtn = $('#editChanges');
    var userName, userMail, userPic;
    function refreshPage(){
        window.location.reload();
    };
    function displayWarning() {
        warningPop.innerHTML = e.message;
        if (e.message != '') {
            warningPop.classList.add('show');
        } else {
            warningPop.classList.remove('show');
        }
    };
    
    authRoot.onAuthStateChanged(function(user){
        if(user){
            userName = user.displayName;
            userMail = user.email;
            userPic = user.photoURL;
            $('.card-img-top').attr('src', userPic);
            $('.card-title').attr('value', userName);
            $('.card-text').attr('value', "<" + userMail + ">");
            // Update userName
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
            
            // Log out current session
            logOutBtn.on('click', function(){
                authRoot.signOut().then(function(){
                    window.location.replace('../index.html')
                }).catch(function (e) {displayWarning()});
            });
        }
    });
    authRoot.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){}).catch(function(e){displayWarning()});
}())