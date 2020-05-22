(function(){
    // Keys
    const authRoot = firebase.auth();
    const googleAuth = new firebase.auth.GoogleAuthProvider();
    const userOperating = authRoot.currentUser;
    const btnRegis = document.getElementById('submit');
    const googleBtnRegis = document.getElementById('googlesignup');
    const emailRegis = document.getElementById('email');
    const passRegis = document.getElementById('password');
    const warningPop = document.getElementById('warning');
    var userName, userMail, userPic;
//    var fnameRegis = document.getElementById('fname');
//    var lnameRegis = document.getElementById('lname');
//    const nameRegis = fnameRegis.value + " " + lnameRegis.value;
    // Functions
    btnRegis.addEventListener('click', e => {
        const mail = emailRegis.value;
        const pass = passRegis.value;
        const promise = authRoot.createUserWithEmailAndPassword(mail, pass);
        promise.catch(function(e){
            warningPop.innerHTML = e.message;
            if (e.message != '') {
                warningPop.classList.add('show');
            } else {
                warningPop.classList.remove('show');
            }
        });
    });
    // Done
    // External providers
    googleBtnRegis.addEventListener('click', e => {
        authRoot.signInWithRedirect(googleAuth);
        authRoot.getRedirectResult().then(function (result) {
            if (result.credential) {
                var token = result.credential.accessToken;
            };
        }).catch(function (e) {
            warningPop.innerHTML = e.message;
            if (e.message != '') {
                warningPop.classList.add('show');
            } else {
                warningPop.classList.remove('show');
            }
        });
    });
    // End
    // Check for change in authentication state
    authRoot.onAuthStateChanged(function(user){
        if(user){
            window.location.replace('./user/index.html');
        }
    });
    authRoot.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){
        console.log("User is logged till sign out.");
        return authRoot.signInWithEmailAndPassword(emailRegis.value, passRegis.value)
    }).catch(function(e){
        warningPop.innerHTML = e.message;
        if (e.message != '') {
            warningPop.classList.add('show');
        } else {
            warningPop.classList.remove('show');
        }
    });
    // End
    // Check for existing user
    if (userOperating != null) {
        userName = userOperating.displayName;
        userMail = userOperating.email;
        userPic = userOperating.photoURL;
        window.location.replace('./user/index.html');
        userOperating.providerData.forEach(function (profile) {
            userName = profile.displayName;
            userMail = profile.email;
            userPic = profile.photoURL;
            window.location.replace('./user/index.html');
        });
    };
}());