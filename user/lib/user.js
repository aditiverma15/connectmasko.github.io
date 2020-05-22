(function(){
    const authRoot = firebase.auth();
    const googleAuth = new firebase.auth.GoogleAuthProvider();
    const userOperating = authRoot.currentUser;
    const btnRegis = document.getElementById('submit');
    const warningPop = document.getElementById('warning');
    var userName, userMail, userPic;
    
    authRoot.onAuthStateChanged(function(user){
        if(user){
            console.log(user)
        }
    });
    authRoot.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){
        console.log("User is logged till sign out.");
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
        console.log(userOperating + " " + userName + " " + userMail);
        userOperating.providerData.forEach(function (profile) {
            userName = profile.displayName;
            userMail = profile.email;
            userPic = profile.photoURL;
            console.log(userOperating + " " + userName + " " + userMail);
        });
    }
}())