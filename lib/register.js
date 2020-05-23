(function(){
    const authRoot = firebase.auth();
    const googleAuth = new firebase.auth.GoogleAuthProvider();
    const userOperating = authRoot.currentUser;
    const btnRegis = document.getElementById('submit');
    const googleBtnRegis = document.getElementById('googlesignup');
    const emailRegis = document.getElementById('email');
    const passRegis = document.getElementById('password');
    const warningPop = document.getElementById('warning');
    var userName, userMail, userPic;
    function displayWarning() {
        warningPop.innerHTML = e.message;
        if (e.message != '') {
            warningPop.classList.add('show');
        } else {
            warningPop.classList.remove('show');
        }
    };
    btnRegis.addEventListener('click', e => {
        const mail = emailRegis.value;
        const pass = passRegis.value;
        const promise = authRoot.createUserWithEmailAndPassword(mail, pass);
        promise.catch(function(e){displayWarning()});
    });
    googleBtnRegis.addEventListener('click', e => {
        authRoot.signInWithRedirect(googleAuth);
        authRoot.getRedirectResult().then(function (result) {
            if (result.credential) {
                var token = result.credential.accessToken;
            };
        }).catch(function (e) {displayWarning()});
    });
    authRoot.onAuthStateChanged(function(user){
        if(user){
            window.location.replace('./user/index.html');
        }
    });
    authRoot.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){
        console.log("User is logged till sign out.");
        return authRoot.signInWithEmailAndPassword(emailRegis.value, passRegis.value)
    }).catch(function(e){displayWarning()});
}());