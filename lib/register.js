(function(){
    // Keys
    const authRoot = firebase.auth();
    const googleAuth = new firebase.auth.GoogleAuthProvider();
    const btnRegis = document.getElementById('submit');
    const googleBtnRegis = document.getElementById('googlesignup');
    const emailRegis = document.getElementById('email');
    const passRegis = document.getElementById('password');
    const warningPop = document.getElementById('warning');
    var fnameRegis = document.getElementById('fname');
    var lnameRegis = document.getElementById('lname');
    const nameRegis = fnameRegis.value + " " + lnameRegis.value;
    
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
    
    googleBtnRegis.addEventListener('click', e => {
        authRoot.signInWithRedirect(googleAuth);
    });
}());