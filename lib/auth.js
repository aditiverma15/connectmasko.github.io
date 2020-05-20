(function(){
    // Keys
    const authRoot = firebase.auth();
    const btnRegis = document.getElementById('submit');
    const emailRegis = document.getElementById('email');
    const passRegis = document.getElementById('password');
    var fnameRegis = document.getElementById('fname');
    var lnameRegis = document.getElementById('lname');
    const nameRegis = fnameRegis.value + " " + lnameRegis.value;
    // Functions
    btnRegis.addEventListener('click', e => {
        const mail = emailRegis.value;
        const pass = passRegis.value;
        const promise = authRoot.signInUserWithEmailAndPassword(mail, pass);
        promise.catch(e =>
                      document.getElementById('warning').innerHTML = e.message,
                     );
    });
}());